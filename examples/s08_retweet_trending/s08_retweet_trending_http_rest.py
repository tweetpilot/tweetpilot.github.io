"""
S08 · Retweet Trending Topics — HTTP REST API (LocalBridge)
=============================================================
EN: Search for high-engagement tweets on a given topic via LocalBridge,
    sort by likes, then retweet the top N results.
    Uses the browser extension as proxy — no OAuth token needed.
中文：通过 LocalBridge 搜索指定话题的高互动推文，
     按点赞数排序后转推前 N 条。
     以浏览器扩展作为代理，无需 OAuth token。

Note / 说明:
  This tab demonstrates LocalBridge (browser-extension) access via raw HTTP.
  If you want to call Twitter's official API directly, refer to:
  https://developer.x.com/en/docs/x-api

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import time
import requests

# ── Config / 配置 ────────────────────────────────────────────────────
LOCAL_BRIDGE = "http://127.0.0.1:20088"

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


def search_tweets(query: str) -> list:
    """
    EN: Search tweets via LocalBridge GET /api/v1/x/search.
        Returns a list of tweet dicts with id, text, author_screen_name, and likes.
    中文：通过 LocalBridge GET /api/v1/x/search 搜索推文。
         返回含 id、text、author_screen_name、likes 的推文字典列表。
    """
    try:
        resp = requests.get(
            f"{LOCAL_BRIDGE}/api/v1/x/search",
            params={"query": query, "count": 20},
            timeout=15,
        )
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)

    tweets = []
    try:
        # EN: LocalBridge wraps response: {"success": true, "data": {"data": {...GraphQL...}}}
        # 中文：LocalBridge 包装响应：{"success": true, "data": {"data": {...GraphQL...}}}
        instructions = (
            resp.json()
                .get("data", {})
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


def retweet(tweet_id: str) -> None:
    """
    EN: Retweet via LocalBridge POST /api/v1/x/retweets.
    中文：通过 LocalBridge POST /api/v1/x/retweets 转推。
    """
    resp = requests.post(
        f"{LOCAL_BRIDGE}/api/v1/x/retweets",
        json={"tweetId": tweet_id},
        timeout=15,
    )
    resp.raise_for_status()


def main():
    print(f"Searching tweets for topic {TOPIC!r}...")

    tweets = search_tweets(TOPIC)

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
            retweet(t["id"])
            print(f"  ✓ Retweeted / 已转推 {t['id']}")
        except Exception as e:
            print(f"  Retweet failed: {e}")
        time.sleep(DELAY_SECONDS)

    print("Done / 完成")


if __name__ == "__main__":
    main()
