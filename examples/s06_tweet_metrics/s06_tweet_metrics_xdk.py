"""
S06 · Tweet Metrics Report — xdk SDK
========================================
EN: Fetch engagement metrics (likes, retweets, replies, impressions) for a
    specific tweet via Twitter API v2.
    TweetPilot provides the OAuth access token automatically.
    Requires OAuth account authorized in TweetPilot Account Settings.
中文：通过 Twitter API v2 获取指定推文的互动数据
     （点赞、转推、回复、展示量）。
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

# EN: Replace with the numeric tweet ID you want to inspect.
# 中文：替换为你要查看的推文数字 ID。
TWEET_ID = "1234567890123456789"  # ← Replace with target tweet ID / 替换为目标推文 ID


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

    print(f"Fetching tweet {TWEET_ID}...")

    try:
        # EN: get_by_id with public_metrics returns likes/retweets/replies/impressions.
        # 中文：get_by_id 传入 public_metrics 可获取点赞、转推、回复、展示量。
        response = client.posts.get_by_id(
            id=TWEET_ID,
            tweet_fields=["public_metrics", "text", "author_id"],
        )
    except Exception as e:
        err_body = ""
        if hasattr(e, "response") and e.response is not None:
            err_body = e.response.text
        print(f"ERROR: Could not fetch tweet: {err_body or e}")
        sys.exit(1)

    tweet = response.data if hasattr(response, "data") else response
    if not tweet:
        print("ERROR: Tweet not found / 未找到该推文")
        sys.exit(1)

    # EN: xdk may return a dict or an object — handle both.
    # 中文：xdk 可能返回 dict 或对象，兼容两种格式。
    if isinstance(tweet, dict):
        text    = tweet.get("text", "")
        metrics = tweet.get("public_metrics", {})
    else:
        text    = getattr(tweet, "text", "") or ""
        metrics = getattr(tweet, "public_metrics", {}) or {}

    likes       = metrics.get("like_count",        "N/A") if isinstance(metrics, dict) else getattr(metrics, "like_count",        "N/A")
    retweets    = metrics.get("retweet_count",      "N/A") if isinstance(metrics, dict) else getattr(metrics, "retweet_count",      "N/A")
    replies     = metrics.get("reply_count",        "N/A") if isinstance(metrics, dict) else getattr(metrics, "reply_count",        "N/A")
    quotes      = metrics.get("quote_count",        "N/A") if isinstance(metrics, dict) else getattr(metrics, "quote_count",        "N/A")
    impressions = metrics.get("impression_count",   "N/A") if isinstance(metrics, dict) else getattr(metrics, "impression_count",   "N/A")

    print(f"\n── Tweet Metrics Report / 推文互动报告 ──")
    print(f"ID          : {TWEET_ID}")
    print(f"Text        : {text[:120]}")
    print(f"Likes       : {likes}")
    print(f"Retweets    : {retweets}")
    print(f"Replies     : {replies}")
    print(f"Quotes      : {quotes}")
    print(f"Impressions : {impressions}")


if __name__ == "__main__":
    main()
