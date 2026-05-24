"""
S07 · Mention Monitor + Feishu Alert — xdk SDK
================================================
EN: Poll recent mentions via Twitter API v2 and send a Feishu (Lark) webhook
    notification for each new mention since the last run.
    Only new mentions are reported. Stores the latest seen tweet ID locally.
    TweetPilot provides the OAuth access token automatically.
中文：通过 Twitter API v2 轮询最新提及，将新提及通过飞书 Webhook 推送通知。
     每次只上报新提及，状态保存在本地文件中。
     TweetPilot 自动提供 OAuth access token，需 x 开头的 OAuth 授权账号。

Requirements / 依赖:
  pip install xdk requests
  TweetPilot running + OAuth account authorized in Account Settings
"""

import sys
import requests
from pathlib import Path
from xdk import Client

# ── Config / 配置 ────────────────────────────────────────────────────
TWITTER_ID = "YOUR_TWITTER_ID"  # ← OAuth account numeric ID / OAuth 账号数字 ID

# EN: Feishu Webhook URL. Create in Feishu group → Settings → Bots → Add Bot → Custom Bot.
# 中文：飞书 Webhook 地址，在飞书群聊 → 设置 → 机器人 → 添加机器人 → 自定义机器人 中创建。
FEISHU_WEBHOOK = "https://open.feishu.cn/open-apis/bot/v2/hook/YOUR_WEBHOOK_TOKEN"

# EN: Path to store the last-seen tweet ID between runs.
# 中文：存储上次已处理的推文 ID（用于增量检测）。
STATE_FILE = Path.home() / ".tweetpilot" / "s07_last_mention_id.txt"


def get_access_token(twitter_id: str) -> str:
    try:
        resp = requests.post(
            "http://127.0.0.1:20088/api/v1/x/oauth/access-token",
            json={"twitter_id": twitter_id},
            timeout=10,
        )
        resp.raise_for_status()
        return resp.json()["access_token"]
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)


def load_last_id() -> str | None:
    try:
        return STATE_FILE.read_text().strip() or None
    except FileNotFoundError:
        return None


def save_last_id(tweet_id: str) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(tweet_id)


def send_feishu_alert(text: str, tweet_id: str, author_id: str) -> None:
    """
    EN: Post a Feishu webhook message for a new mention.
    中文：通过飞书 Webhook 发送新提及通知。
    """
    url = f"https://x.com/i/web/status/{tweet_id}"
    payload = {
        "msg_type": "text",
        "content": {
            "text": f"🔔 New mention / 新提及\n{text[:200]}\n{url}",
        },
    }
    resp = requests.post(FEISHU_WEBHOOK, json=payload, timeout=10)
    resp.raise_for_status()


def main():
    if TWITTER_ID == "YOUR_TWITTER_ID":
        print("ERROR: Please set TWITTER_ID to your numeric Twitter account ID.")
        print("错误：请将 TWITTER_ID 替换为你的数字 Twitter 账号 ID（仅限 OAuth 授权账号）。")
        sys.exit(1)

    # EN: Must use access_token= (User OAuth 2.0), NOT bearer_token= (read-only).
    # 中文：必须用 access_token= 传入，bearer_token= 是只读的 App token。
    client = Client(access_token=get_access_token(TWITTER_ID))

    last_id = load_last_id()
    print(f"Fetching mentions for {TWITTER_ID} (since_id={last_id or 'none'})...")

    new_tweets = []
    try:
        # EN: get_mentions returns paginated mention timeline, newest first.
        #     Pass since_id to only fetch mentions newer than the last run.
        # 中文：get_mentions 返回分页的提及时间线，最新在前。
        #      传入 since_id 只获取上次运行后的新提及。
        for page in client.users.get_mentions(
            id=TWITTER_ID,
            max_results=20,
            since_id=last_id,
            tweet_fields=["text", "author_id"],
        ):
            for tweet in (page.data or []):
                new_tweets.append(tweet)
            break  # EN: One page is enough per run. / 每次运行取一页即可。
    except Exception as e:
        err_body = ""
        if hasattr(e, "response") and e.response is not None:
            err_body = e.response.text
        print(f"ERROR: Could not fetch mentions: {err_body or e}")
        sys.exit(1)

    if not new_tweets:
        print("No new mentions since last run / 自上次运行以来无新提及")
        return

    print(f"Found {len(new_tweets)} new mention(s) / 发现 {len(new_tweets)} 条新提及")

    # EN: Send Feishu alert for each new mention (oldest first).
    # 中文：从旧到新依次推送飞书通知。
    for t in reversed(new_tweets):
        # EN: xdk get_mentions returns dicts, not objects — use dict access.
        # 中文：xdk get_mentions 返回 dict 列表，使用字典访问。
        text     = (t.get("text") if isinstance(t, dict) else getattr(t, "text", "") or "")
        tweet_id = (t.get("id")   if isinstance(t, dict) else t.id)
        author_id = (t.get("author_id") if isinstance(t, dict) else getattr(t, "author_id", ""))
        print(f"  Alerting tweet {tweet_id}: {text[:80]!r}")
        try:
            send_feishu_alert(text=text, tweet_id=tweet_id, author_id=author_id)
        except Exception as e:
            print(f"  Feishu alert failed: {e}")

    # EN: Save the newest tweet ID as the new watermark.
    # 中文：保存最新推文 ID 作为下次运行的水位线。
    first = new_tweets[0]
    newest_id = (first.get("id") if isinstance(first, dict) else first.id)
    save_last_id(newest_id)
    print(f"Done / 完成. Last ID saved: {newest_id}")


if __name__ == "__main__":
    main()
