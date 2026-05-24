"""
S08 · Retweet Trending Topics — ClawBot SDK
============================================
EN: Search for high-engagement tweets on a given topic via TweetClaw,
    sort by likes, then retweet the top N results.
    No trending API needed — uses keyword search + engagement filtering.
中文：通过 TweetClaw 搜索指定话题的高互动推文，
     按点赞数排序后转推前 N 条。
     无需 trending API，以关键词搜索 + 互动数过滤实现。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import time
from clawbot import ClawBotClient

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: Topic keyword or hashtag to search.
# 中文：搜索关键词或 hashtag。
TOPIC = "#AI"  # ← Replace / 替换为你想搜索的话题

# EN: Only retweet tweets with at least this many likes.
# 中文：仅转推点赞数不低于此值的推文。
MIN_LIKES = 100  # ← Minimum likes threshold / 最低点赞数

# EN: Maximum number of tweets to retweet per run.
# 中文：每次最多转推条数。
TOP_N = 3  # ← Max retweets per run / 每次最多转推数

# EN: Seconds to wait between retweets (avoid rate limiting).
# 中文：每次转推之间的等待秒数（避免频率限制）。
DELAY_SECONDS = 3


def parse_search_raw(raw: dict) -> list:
    """
    EN: Parse raw LocalBridge search response into a flat list of tweet dicts.
        Each dict has: id, text, author_screen_name, likes.
    中文：解析 LocalBridge 搜索原始响应，返回推文字典列表。
         每条含 id、text、author_screen_name、likes。
    """
    tweets = []
    try:
        instructions = (
            raw.get("data", {})
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
                legacy  = tweet.get("legacy", {})
                text    = legacy.get("full_text", "")
                likes   = legacy.get("favorite_count", 0)
                screen_name = (
                    tweet.get("core", {})
                         .get("user_results", {})
                         .get("result", {})
                         .get("core", {})
                         .get("screen_name", "unknown")
                )
                if rest_id:
                    tweets.append({
                        "id": rest_id,
                        "text": text,
                        "author_screen_name": screen_name,
                        "likes": likes,
                    })
    except Exception as e:
        print(f"WARNING: Could not parse search results: {e}")
    return tweets


def main():
    client = ClawBotClient()

    # EN: Auto-select first connected TweetClaw instance.
    # 中文：自动选择第一个已连接的 TweetClaw 实例。
    instances = client.x.status.get_instances()
    instance_id = None
    if isinstance(instances, list) and instances:
        instance_id = instances[0].get("instanceId") or instances[0].get("id")

    print(f"Searching tweets for topic {TOPIC!r}...")

    try:
        raw = client.x.tweets.transport.search_raw(
            query=TOPIC,
            count=20,
            instance_id=instance_id,
        )
    except Exception as e:
        print(f"ERROR: Search failed: {e}")
        sys.exit(1)

    tweets = parse_search_raw(raw)

    if not tweets:
        print("No tweets found / 未找到推文")
        return

    # EN: Sort by likes descending, then apply MIN_LIKES filter.
    # 中文：按点赞数降序排序，再过滤低于门槛的推文。
    sorted_tweets = sorted(tweets, key=lambda t: t["likes"], reverse=True)
    top_tweets = [t for t in sorted_tweets if t["likes"] >= MIN_LIKES][:TOP_N]

    if not top_tweets:
        print(f"No tweets with >= {MIN_LIKES} likes / 没有点赞数达到 {MIN_LIKES} 的推文")
        return

    print(f"Retweeting top {len(top_tweets)} tweet(s) / 转推前 {len(top_tweets)} 条...")

    for t in top_tweets:
        print(f"  [{t['likes']} likes] @{t['author_screen_name']}: {t['text'][:80]!r}")
        try:
            client.x.actions.retweet(tweet_id=t["id"], instance_id=instance_id)
            print(f"  ✓ Retweeted / 已转推 {t['id']}")
        except Exception as e:
            print(f"  Retweet failed: {e}")
        time.sleep(DELAY_SECONDS)

    print("Done / 完成")


if __name__ == "__main__":
    main()
