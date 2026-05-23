"""
S01 · Scheduled Tweet — HTTP REST API
========================================
EN: Post a tweet using raw HTTP requests — no Twitter SDK needed.
    Step 1: fetch OAuth token from TweetPilot's rust-bridge.
    Step 2: call Twitter API v2 POST /2/tweets directly.
中文：使用原始 HTTP 请求发推，不依赖任何 Twitter SDK。
     第一步：从 TweetPilot rust-bridge 获取 OAuth token。
     第二步：直接调用 Twitter API v2 POST /2/tweets。

Requirements / 依赖:
  pip install requests
  TweetPilot running + OAuth account authorized in Account Settings
"""

import sys
import requests
from datetime import datetime

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: Replace with your Twitter numeric ID.
# 中文：替换为你的 Twitter 数字 ID。
TWITTER_ID = "YOUR_TWITTER_ID"

TWEET_TEXT = "Daily update {date} — powered by TweetPilot"

RUST_BRIDGE = "http://127.0.0.1:20088"
TWITTER_V2  = "https://api.twitter.com/2"


def get_access_token(twitter_id: str) -> str:
    """
    EN: GET OAuth token from TweetPilot's rust-bridge (no SDK needed).
    中文：从 TweetPilot rust-bridge 获取 OAuth token（无需 SDK）。
    """
    try:
        resp = requests.post(
            f"{RUST_BRIDGE}/api/v1/x/oauth/access-token",
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


def post_tweet(token: str, text: str) -> dict:
    """
    EN: POST /2/tweets — create a new tweet via Twitter API v2.
    中文：调用 Twitter API v2 的 POST /2/tweets 接口发推。
    """
    resp = requests.post(
        f"{TWITTER_V2}/tweets",
        json={"text": text},
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


def main():
    token = get_access_token(TWITTER_ID)
    text  = TWEET_TEXT.format(date=datetime.now().strftime("%Y-%m-%d"))

    data = post_tweet(token, text)

    tweet_id = data.get("data", {}).get("id", "?")
    print(f"Tweet sent / 发推成功: {text}")
    print(f"Tweet ID: {tweet_id}")


if __name__ == "__main__":
    main()
