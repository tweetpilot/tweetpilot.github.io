"""
S04 · Timeline Auto-Like — xdk SDK
======================================
EN: Read the home timeline via Twitter API v2 and like the first tweet
    that matches a keyword filter. Only likes ONE tweet per run.
    TweetPilot provides the OAuth access token automatically.
    Requires OAuth account authorized in TweetPilot Account Settings.
中文：通过 Twitter API v2 读取主页时间线，对第一条匹配关键词的推文点赞。
     每次只点赞一条，避免触发限流。
     TweetPilot 自动提供 OAuth access token，需 x 开头的 OAuth 授权账号。

Requirements / 依赖:
  pip install xdk requests
  TweetPilot running + OAuth account authorized in Account Settings
"""

import sys
import requests
from xdk import Client

# ── Config / 配置 ────────────────────────────────────────────────────
TWITTER_ID = "YOUR_TWITTER_ID"  # ← OAuth account numeric ID / OAuth 账号数字 ID
KEYWORD    = "AI"               # ← Keyword filter (case-insensitive) / 关键词过滤（不区分大小写）

# EN: ⚠️ Only likes ONE matching tweet per run.
#     Run on a schedule (e.g. every 30 min) to stay within rate limits.
# 中文：⚠️ 每次只点赞一条匹配推文，建议每 30 分钟以上定时执行。


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


def main():
    if TWITTER_ID == "YOUR_TWITTER_ID":
        print("ERROR: Please set TWITTER_ID to your numeric Twitter account ID.")
        print("错误：请将 TWITTER_ID 替换为你的数字 Twitter 账号 ID（仅限 OAuth 授权账号）。")
        sys.exit(1)

    # EN: Must use access_token= (User OAuth 2.0), NOT bearer_token= (read-only).
    # 中文：必须用 access_token= 传入，bearer_token= 是只读的 App token。
    client = Client(access_token=get_access_token(TWITTER_ID))

    # EN: Fetch home timeline. get_timeline requires the authenticated user's ID.
    # 中文：获取主页时间线，get_timeline 需要传入认证用户自己的 ID。
    print("Fetching timeline / 获取时间线...")
    target = None
    try:
        for page in client.users.get_timeline(id=TWITTER_ID, max_results=20):
            for tweet in (page.data or []):
                # EN: xdk get_timeline returns dicts, not objects — use dict access.
                # 中文：xdk get_timeline 返回 dict 列表，使用字典访问。
                text = (tweet.get("text") if isinstance(tweet, dict) else tweet.text or "")
                if not KEYWORD or KEYWORD.lower() in text.lower():
                    target = tweet
                    break
            if target:
                break
    except Exception as e:
        print(f"ERROR: Could not fetch timeline: {e}")
        sys.exit(1)

    if not target:
        print(f"No tweet matched keyword \"{KEYWORD}\" / 未找到包含关键词的推文")
        sys.exit(1)

    tweet_id = target["id"] if isinstance(target, dict) else target.id
    text     = (target.get("text") if isinstance(target, dict) else target.text or "")
    print(f"Liking tweet {tweet_id}: {text[:60]!r}")

    try:
        # EN: like_post requires the authenticated user's ID and the tweet ID.
        # 中文：like_post 需要传入自己的用户 ID 和目标推文 ID。
        client.users.like_post(
            id=TWITTER_ID,
            body={"tweet_id": tweet_id},
        )
        print(f"Done / 完成: liked tweet {tweet_id}")
    except Exception as e:
        print(f"Failed / 失败: {e}")
        if hasattr(e, "response") and e.response is not None:
            print(f"Error body: {e.response.text}")
        sys.exit(1)


if __name__ == "__main__":
    main()
