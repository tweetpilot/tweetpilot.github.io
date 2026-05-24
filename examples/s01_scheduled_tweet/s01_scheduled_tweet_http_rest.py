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


def post_tweet(text: str) -> str:
    """
    EN: POST /api/v1/x/tweets — send a tweet via LocalBridge.
        Returns tweet ID on success. Exits on error.
    中文：调用 LocalBridge POST /api/v1/x/tweets 发推。
         成功返回推文 ID，失败直接退出。
    """
    try:
        resp = requests.post(
            f"{LOCAL_BRIDGE}/api/v1/x/tweets",
            json={"text": text},
            timeout=15,
        )
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)

    data = resp.json()

    # EN: LocalBridge returns HTTP 200 even when Twitter rejects the tweet.
    #     Must check the response body for GraphQL-level errors.
    # 中文：LocalBridge 即使推特拒绝发推也会返回 HTTP 200，
    #      必须检查响应体中是否有 GraphQL 错误。
    errors = data.get("data", {}).get("errors")
    if errors:
        for err in errors:
            code = err.get("code", "?")
            msg  = err.get("message", str(err))
            print(f"ERROR: Twitter rejected tweet — code {code}: {msg}")
            # EN: Common error codes:
            #   187 = duplicate tweet (same content already posted today)
            #   226 = tweet flagged as automated spam
            #   261 = app suspended
            # 中文：常见错误码：
            #   187 = 重复推文（今日已发过相同内容）
            #   226 = 被标记为自动垃圾推文
            #   261 = 应用已被暂停
        sys.exit(1)

    # EN: Parse tweet ID from the raw GraphQL response.
    # 中文：从 LocalBridge 返回的原始 GraphQL 响应中解析推文 ID。
    try:
        tweet_id = data["data"]["data"]["create_tweet"]["tweet_results"]["result"]["rest_id"]
    except (KeyError, TypeError):
        print(f"WARNING: Could not parse tweet ID from response: {data}")
        tweet_id = "unknown"

    return tweet_id


def main():
    text     = TWEET_TEXT.format(date=datetime.now().strftime("%Y-%m-%d"))
    tweet_id = post_tweet(text)
    print(f"Tweet sent / 发推成功: {text}")
    print(f"Tweet ID: {tweet_id}")


if __name__ == "__main__":
    main()
