"""
S07 · Mention Monitor + Feishu Alert — ClawBot SDK
=====================================================
EN: Search for recent mentions of your @handle via the TweetClaw browser
    extension, then send a Feishu notification for each new mention since
    the last run. Only new mentions are reported.
    Stores the latest seen tweet ID in a local state file.
    Uses TweetPilot's built-in Feishu channel — no Webhook URL needed.
中文：通过 TweetClaw 浏览器扩展搜索 @你的账号 的最新提及，
     将上次运行后的新提及通过 TweetPilot 内置飞书通道推送。
     每次只上报新提及，状态保存在本地文件中。
     无需配置飞书 Webhook，TweetPilot 已内置飞书发送接口。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import requests
from pathlib import Path
from clawbot import ClawBotClient

# ── Config / 配置 ────────────────────────────────────────────────────
LOCAL_BRIDGE = "http://127.0.0.1:20088"

# EN: Your Twitter @handle (without the @).
# 中文：你的 Twitter 用户名（不含 @）。
SCREEN_NAME = "huhulws"  # ← Replace / 替换为你的 Twitter 用户名（不含 @）

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

    client = ClawBotClient()

    # EN: Auto-select the first connected TweetClaw instance.
    # 中文：自动选择第一个已连接的 TweetClaw 实例。
    instances = client.x.status.get_instances()
    instance_id = None
    if isinstance(instances, list) and instances:
        instance_id = instances[0].get("instanceId") or instances[0].get("id")

    last_id = load_last_id()
    print(f"Searching mentions of @{SCREEN_NAME} (since_id={last_id or 'none'})...")

    # EN: search_tweets returns tweets that match the query, newest first.
    # 中文：search_tweets 返回匹配关键词的推文，最新在前。
    try:
        tweets = client.x.tweets.search_tweets(
            query=f"@{SCREEN_NAME}",
            count=20,
            instance_id=instance_id,
        )
    except Exception as e:
        print(f"ERROR: Search failed: {e}")
        sys.exit(1)

    if not tweets:
        print("No mentions found / 未找到提及")
        return

    # EN: Filter to only tweets newer than the last seen ID.
    # 中文：只处理比上次 ID 更新的推文（增量检测）。
    new_tweets = []
    for t in tweets:
        if last_id and t.id <= last_id:
            break
        new_tweets.append(t)

    if not new_tweets:
        print("No new mentions since last run / 自上次运行以来无新提及")
        return

    print(f"Found {len(new_tweets)} new mention(s) / 发现 {len(new_tweets)} 条新提及")

    # EN: Send Feishu alert for each new mention (oldest first).
    # 中文：从旧到新依次推送飞书通知。
    for t in reversed(new_tweets):
        text   = getattr(t, "text", "") or ""
        author = getattr(t, "author_screen_name", "unknown") or "unknown"
        print(f"  Alerting: @{author}: {text[:80]!r}")
        try:
            send_feishu_alert(text=text, tweet_id=t.id, author=author)
        except Exception as e:
            print(f"  Feishu alert failed: {e}")

    # EN: Save the newest tweet ID as the new watermark.
    # 中文：保存最新推文 ID 作为下次运行的水位线。
    save_last_id(new_tweets[0].id)
    print(f"Done / 完成. Last ID saved: {new_tweets[0].id}")


if __name__ == "__main__":
    main()
