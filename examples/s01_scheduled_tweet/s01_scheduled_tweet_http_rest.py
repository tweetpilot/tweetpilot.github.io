"""
S01 · Scheduled Tweet — HTTP REST API (LocalBridge)
=====================================================
EN: Post a tweet by calling TweetPilot's LocalBridge REST API directly.
    This approach uses the browser extension as a proxy — no OAuth token
    needed. Requires TweetClaw extension online in the browser.
中文：通过直接调用 TweetPilot LocalBridge REST API 发推。
     此方式以浏览器扩展作为代理，无需 OAuth token。
     需要 TweetClaw 扩展在浏览器中保持在线。

Note / 说明:
  This tab demonstrates LocalBridge (browser-extension) access via raw HTTP.
  If you want to call Twitter's official API directly (without the extension),
  refer to Twitter's official documentation: https://developer.x.com/en/docs/x-api
  注：本示例演示通过裸 HTTP 调用 LocalBridge（浏览器扩展代理）。
  如需直接调用推特官方 API，请参考推特官方文档，网上资料也很丰富。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import requests
from datetime import datetime

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: LocalBridge listens on port 20088 by default.
# 中文：LocalBridge 默认监听 20088 端口。
LOCAL_BRIDGE = "http://127.0.0.1:20088"

TWEET_TEXT = "Daily update {date} — powered by TweetPilot"


def post_tweet(text: str) -> dict:
    """
    EN: POST /api/v1/x/tweets — send a tweet via LocalBridge.
        The browser extension handles authentication transparently.
    中文：调用 LocalBridge POST /api/v1/x/tweets 发推。
         浏览器扩展会自动处理认证，无需手动传 token。
    """
    try:
        resp = requests.post(
            f"{LOCAL_BRIDGE}/api/v1/x/tweets",
            json={"text": text},
            timeout=15,
        )
        resp.raise_for_status()
        return resp.json()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)


def main():
    text = TWEET_TEXT.format(date=datetime.now().strftime("%Y-%m-%d"))
    data = post_tweet(text)

    # EN: Parse tweet ID from the raw GraphQL response returned by LocalBridge.
    # 中文：从 LocalBridge 返回的原始 GraphQL 响应中解析推文 ID。
    try:
        tweet_id = data["data"]["create_tweet"]["tweet_results"]["result"]["rest_id"]
    except (KeyError, TypeError):
        tweet_id = str(data)

    print(f"Tweet sent / 发推成功: {text}")
    print(f"Tweet ID: {tweet_id}")


if __name__ == "__main__":
    main()
