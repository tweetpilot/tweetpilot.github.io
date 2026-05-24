"""
S06 · Tweet Metrics Report — ClawBot SDK
==========================================
EN: Fetch engagement metrics (likes, retweets, replies, bookmarks) for a
    specific tweet via the TweetClaw browser extension and print a report.
    No OAuth token needed — uses the browser extension as proxy.
中文：通过 TweetClaw 浏览器扩展获取指定推文的互动数据
     （点赞、转推、回复、书签）并打印报告。
     无需 OAuth token，以浏览器扩展作为代理。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
from clawbot import ClawBotClient

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: Replace with the numeric tweet ID you want to inspect.
# 中文：替换为你要查看的推文数字 ID。
TWEET_ID = "2058496416046297229"  # ← Replace with target tweet ID / 替换为目标推文 ID


def main():
    client = ClawBotClient()

    # EN: Auto-select the first connected TweetClaw instance.
    # 中文：自动选择第一个已连接的 TweetClaw 实例。
    instances = client.x.status.get_instances()
    instance_id = None
    if isinstance(instances, list) and instances:
        instance_id = instances[0].get("instanceId") or instances[0].get("id")

    print(f"Fetching tweet {TWEET_ID}...")

    # EN: get_tweet() fetches the full tweet object including legacy metrics.
    # 中文：get_tweet() 获取完整推文对象，含 legacy 字段里的互动数据。
    try:
        tweet = client.x.tweets.get_tweet(tweet_id=TWEET_ID, instance_id=instance_id)
    except Exception as e:
        print(f"ERROR: Could not fetch tweet: {e}")
        sys.exit(1)

    if not tweet or not tweet.id:
        print("ERROR: Tweet not found / 未找到该推文")
        sys.exit(1)

    # EN: Metrics live in the raw GraphQL response under the "legacy" key.
    # 中文：互动数据存在原始 GraphQL 响应的 "legacy" 字段中。
    legacy = tweet.raw.get("legacy", {})
    likes     = legacy.get("favorite_count", "N/A")
    retweets  = legacy.get("retweet_count",  "N/A")
    replies   = legacy.get("reply_count",    "N/A")
    quotes    = legacy.get("quote_count",    "N/A")
    bookmarks = legacy.get("bookmark_count", "N/A")
    text      = legacy.get("full_text") or tweet.text or ""

    print(f"\n── Tweet Metrics Report / 推文互动报告 ──")
    print(f"ID        : {tweet.id}")
    print(f"Author    : @{tweet.author_screen_name}")
    print(f"Text      : {text[:120]}")
    print(f"Likes     : {likes}")
    print(f"Retweets  : {retweets}")
    print(f"Replies   : {replies}")
    print(f"Quotes    : {quotes}")
    print(f"Bookmarks : {bookmarks}")


if __name__ == "__main__":
    main()
