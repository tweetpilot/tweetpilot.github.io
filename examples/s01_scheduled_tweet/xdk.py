"""
S01 · Scheduled Tweet — xdk SDK
==================================
EN: Post a tweet via Twitter OAuth using the xdk client.
    TweetPilot provides the OAuth access token automatically — no manual
    token setup required. Add to TweetPilot's Task Manager for scheduling.
中文：通过 Twitter OAuth 授权（xdk 客户端）发推。
     TweetPilot 自动提供 OAuth access token，无需手动配置。
     在 TweetPilot 任务管理器中添加本脚本即可定时发推。

Requirements / 依赖:
  pip install xdk requests
  TweetPilot running + OAuth account authorized in Account Settings
"""

import sys
import requests
from datetime import datetime
from xdk import Client

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: Replace with your Twitter numeric ID.
#     Find it in TweetPilot → Account Settings → Account ID.
# 中文：替换为你的 Twitter 数字 ID。
#      在 TweetPilot → 账号设置 → 账号 ID 中查看。
TWITTER_ID = "YOUR_TWITTER_ID"

TWEET_TEXT = "Daily update {date} — powered by TweetPilot"


def get_access_token(twitter_id: str) -> str:
    """
    EN: Fetch OAuth token from TweetPilot's local rust-bridge (port 20088).
    中文：从 TweetPilot 本地 rust-bridge（端口 20088）获取 OAuth token。
    """
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
    # EN: Initialize xdk Client with the token provided by TweetPilot.
    # 中文：用 TweetPilot 提供的 token 初始化 xdk Client。
    client = Client(bearer_token=get_access_token(TWITTER_ID))

    text = TWEET_TEXT.format(date=datetime.now().strftime("%Y-%m-%d"))

    # EN: posts.create() → Twitter v2 POST /2/tweets
    # 中文：posts.create() 调用 Twitter v2 POST /2/tweets 发推
    result = client.posts.create(body={"text": text})

    try:
        tweet_id = result.data.id
    except Exception:
        tweet_id = str(result)

    print(f"Tweet sent / 发推成功: {text}")
    print(f"Tweet ID: {tweet_id}")


if __name__ == "__main__":
    main()
