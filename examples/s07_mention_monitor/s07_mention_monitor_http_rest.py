"""
S07 · Mention Monitor + Feishu Alert — HTTP REST API (LocalBridge)
====================================================================
EN: Search for recent mentions of your @handle via LocalBridge, then send
    a Feishu notification for each new mention since the last run.
    Only new mentions are reported.
    Uses TweetPilot's built-in Feishu channel — no Webhook URL needed.
    Uses the browser extension as proxy — no OAuth token needed.
中文：通过 LocalBridge 搜索 @你的账号 的最新提及，将新提及通过 TweetPilot 内置飞书通道推送。
     每次只上报新提及，状态保存在本地文件中。
     无需配置飞书 Webhook，TweetPilot 已内置飞书发送接口。
     以浏览器扩展作为代理，无需 OAuth token。

Note / 说明:
  This tab demonstrates LocalBridge (browser-extension) access via raw HTTP.
  If you want to call Twitter's official API directly, refer to:
  https://developer.x.com/en/docs/x-api

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import requests
from pathlib import Path

# ── Config / 配置 ────────────────────────────────────────────────────
LOCAL_BRIDGE = "http://127.0.0.1:20088"

# EN: Your Twitter @handle (without the @).
# 中文：你的 Twitter 用户名（不含 @）。
SCREEN_NAME = "your_handle"  # ← Replace / 替换为你的 Twitter 用户名（不含 @）

# EN: Path to store the last-seen tweet ID between runs.
# 中文：存储上次已处理的推文 ID（用于增量检测）。
STATE_FILE = Path.home() / ".tweetpilot" / "s07_last_mention_id.txt"


def load_last_id() -> str | None:
    try:
        return STATE_FILE.read_text().strip() or None
    except FileNotFoundError:
        return None


def save_last_id(tweet_id: str) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(tweet_id)


def search_mentions(query: str) -> list:
    """
    EN: Search tweets via LocalBridge GET /api/v1/x/search.
        Returns a flat list of tweet dicts with id, text, and author_screen_name.
    中文：通过 LocalBridge GET /api/v1/x/search 搜索推文。
         返回含 id、text、author_screen_name 的推文字典列表。
    """
    try:
        resp = requests.get(
            f"{LOCAL_BRIDGE}/api/v1/x/search",
            params={"query": query, "count": 20},
            timeout=15,
        )
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)

    tweets = []
    try:
        # EN: LocalBridge wraps response: {"success": true, "data": {"data": {...GraphQL...}}}
        # 中文：LocalBridge 包装响应：{"success": true, "data": {"data": {...GraphQL...}}}
        instructions = (
            resp.json()
                .get("data", {})
                .get("data", {})
                .get("search_by_raw_query", {})
                .get("search_timeline", {})
                .get("timeline", {})
                .get("instructions", [])
        )
        for instruction in instructions:
            for entry in instruction.get("entries", []):
                result = (
                    entry.get("content", {})
                         .get("itemContent", {})
                         .get("tweet_results", {})
                         .get("result", {})
                )
                if not result:
                    continue
                # EN: Handle TweetWithVisibilityResults wrapper.
                # 中文：兼容 TweetWithVisibilityResults 包装格式。
                tweet   = result.get("tweet") or result
                rest_id = tweet.get("rest_id") or result.get("rest_id")
                text    = tweet.get("legacy", {}).get("full_text", "")
                screen_name = (
                    tweet.get("core", {})
                         .get("user_results", {})
                         .get("result", {})
                         .get("core", {})
                         .get("screen_name", "unknown")
                )
                if rest_id:
                    tweets.append({"id": rest_id, "text": text, "author_screen_name": screen_name})
    except Exception as e:
        print(f"WARNING: Could not parse search results: {e}")

    return tweets


def send_feishu_alert(text: str, tweet_id: str, author: str) -> None:
    """
    EN: Send a Feishu notification via TweetPilot LocalBridge POST /api/v1/feishu/send.
        No external Webhook URL needed — TweetPilot handles the Feishu channel.
    中文：通过 TweetPilot LocalBridge POST /api/v1/feishu/send 发送飞书通知。
         无需外部 Webhook，TweetPilot 内置飞书发送接口。
    """
    url = f"https://x.com/{author}/status/{tweet_id}"
    message = f"🔔 New mention / 新提及\n@{author}: {text[:200]}\n{url}"
    resp = requests.post(
        f"{LOCAL_BRIDGE}/api/v1/feishu/send",
        json={"text": message},
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(f"Feishu send failed: {data}")


def main():
    if SCREEN_NAME == "your_handle":
        print("ERROR: Please set SCREEN_NAME to your Twitter handle.")
        print("错误：请将 SCREEN_NAME 替换为你的 Twitter 用户名（不含 @）。")
        sys.exit(1)

    last_id = load_last_id()
    print(f"Searching mentions of @{SCREEN_NAME} (since_id={last_id or 'none'})...")

    tweets = search_mentions(f"@{SCREEN_NAME}")

    if not tweets:
        print("No mentions found / 未找到提及")
        return

    # EN: Filter to only tweets newer than the last seen ID.
    # 中文：只处理比上次 ID 更新的推文（增量检测）。
    new_tweets = []
    for t in tweets:
        if last_id and t["id"] <= last_id:
            break
        new_tweets.append(t)

    if not new_tweets:
        print("No new mentions since last run / 自上次运行以来无新提及")
        return

    print(f"Found {len(new_tweets)} new mention(s) / 发现 {len(new_tweets)} 条新提及")

    # EN: Send Feishu alert for each new mention (oldest first).
    # 中文：从旧到新依次推送飞书通知。
    for t in reversed(new_tweets):
        print(f"  Alerting @{t['author_screen_name']}: {t['text'][:80]!r}")
        try:
            send_feishu_alert(text=t["text"], tweet_id=t["id"], author=t["author_screen_name"])
        except Exception as e:
            print(f"  Feishu alert failed: {e}")

    # EN: Save the newest tweet ID as the new watermark.
    # 中文：保存最新推文 ID 作为下次运行的水位线。
    save_last_id(new_tweets[0]["id"])
    print(f"Done / 完成. Last ID saved: {new_tweets[0]['id']}")


if __name__ == "__main__":
    main()



def load_last_id() -> str | None:
    try:
        return STATE_FILE.read_text().strip() or None
    except FileNotFoundError:
        return None


def save_last_id(tweet_id: str) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(tweet_id)


def search_mentions(query: str) -> list:
    """
    EN: Search tweets via LocalBridge GET /api/v1/x/search.
        Returns a flat list of tweet dicts with id, text, and author_screen_name.
    中文：通过 LocalBridge GET /api/v1/x/search 搜索推文。
         返回含 id、text、author_screen_name 的推文字典列表。
    """
    try:
        resp = requests.get(
            f"{LOCAL_BRIDGE}/api/v1/x/search",
            params={"query": query, "count": 20},
            timeout=15,
        )
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)

    tweets = []
    try:
        # EN: LocalBridge wraps response: {"ok": true, "data": {"data": {...GraphQL...}}}
        # 中文：LocalBridge 包装响应：{"ok": true, "data": {"data": {...GraphQL...}}}
        instructions = (
            resp.json()
                .get("data", {})
                .get("data", {})
                .get("search_by_raw_query", {})
                .get("search_timeline", {})
                .get("timeline", {})
                .get("instructions", [])
        )
        for instruction in instructions:
            for entry in instruction.get("entries", []):
                result = (
                    entry.get("content", {})
                         .get("itemContent", {})
                         .get("tweet_results", {})
                         .get("result", {})
                )
                if not result:
                    continue
                # EN: Handle TweetWithVisibilityResults wrapper.
                # 中文：兼容 TweetWithVisibilityResults 包装格式。
                tweet   = result.get("tweet") or result
                rest_id = tweet.get("rest_id") or result.get("rest_id")
                text    = tweet.get("legacy", {}).get("full_text", "")
                screen_name = (
                    tweet.get("core", {})
                         .get("user_results", {})
                         .get("result", {})
                         .get("core", {})
                         .get("screen_name", "unknown")
                )
                if rest_id:
                    tweets.append({"id": rest_id, "text": text, "author_screen_name": screen_name})
    except Exception as e:
        print(f"WARNING: Could not parse search results: {e}")

    return tweets


def send_feishu_alert(text: str, tweet_id: str, author: str) -> None:
    """
    EN: Post a Feishu webhook message for a new mention.
    中文：通过飞书 Webhook 发送新提及通知。
    """
    url = f"https://x.com/{author}/status/{tweet_id}"
    payload = {
        "msg_type": "text",
        "content": {
            "text": f"🔔 New mention / 新提及\n@{author}: {text[:200]}\n{url}",
        },
    }
    resp = requests.post(FEISHU_WEBHOOK, json=payload, timeout=10)
    resp.raise_for_status()


def main():
    if SCREEN_NAME == "your_handle":
        print("ERROR: Please set SCREEN_NAME to your Twitter handle.")
        print("错误：请将 SCREEN_NAME 替换为你的 Twitter 用户名（不含 @）。")
        sys.exit(1)

    last_id = load_last_id()
    print(f"Searching mentions of @{SCREEN_NAME} (since_id={last_id or 'none'})...")

    tweets = search_mentions(f"@{SCREEN_NAME}")

    if not tweets:
        print("No mentions found / 未找到提及")
        return

    # EN: Filter to only tweets newer than the last seen ID.
    # 中文：只处理比上次 ID 更新的推文（增量检测）。
    new_tweets = []
    for t in tweets:
        if last_id and t["id"] <= last_id:
            break
        new_tweets.append(t)

    if not new_tweets:
        print("No new mentions since last run / 自上次运行以来无新提及")
        return

    print(f"Found {len(new_tweets)} new mention(s) / 发现 {len(new_tweets)} 条新提及")

    # EN: Send Feishu alert for each new mention (oldest first).
    # 中文：从旧到新依次推送飞书通知。
    for t in reversed(new_tweets):
        print(f"  Alerting @{t['author_screen_name']}: {t['text'][:80]!r}")
        try:
            send_feishu_alert(text=t["text"], tweet_id=t["id"], author=t["author_screen_name"])
        except Exception as e:
            print(f"  Feishu alert failed: {e}")

    # EN: Save the newest tweet ID as the new watermark.
    # 中文：保存最新推文 ID 作为下次运行的水位线。
    save_last_id(new_tweets[0]["id"])
    print(f"Done / 完成. Last ID saved: {new_tweets[0]['id']}")


if __name__ == "__main__":
    main()
