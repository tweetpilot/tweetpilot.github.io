"""
S08 · Retweet Trending Topics — xdk SDK
=========================================
EN: Search for high-engagement tweets on a given topic via Twitter API v2,
    sort by public metrics, then retweet the top N results.
    TweetPilot provides the OAuth access token automatically.
中文：通过 Twitter API v2 搜索指定话题的高互动推文，
     按互动数排序后转推前 N 条。
     TweetPilot 自动提供 OAuth access token。

Requirements / 依赖:
  pip install xdk requests
  TweetPilot running + OAuth account authorized in Account Settings
"""

import sys
import time
import requests
from xdk import Client

# ── Config / 配置 ────────────────────────────────────────────────────
LOCAL_BRIDGE = "http://127.0.0.1:20088"
TWITTER_ID   = "1735224873365225472"  # ← OAuth account numeric ID / OAuth 账号数字 ID

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


def get_access_token(twitter_id: str) -> str:
    try:
        resp = requests.post(
            f"{LOCAL_BRIDGE}/api/v1/x/oauth/access-token",
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


def get_likes(tweet) -> int:
    """Extract like count from tweet dict or object."""
    if isinstance(tweet, dict):
        m = tweet.get("public_metrics") or {}
        return m.get("like_count", 0) if isinstance(m, dict) else getattr(m, "like_count", 0)
    m = getattr(tweet, "public_metrics", None)
    if m is None:
        return 0
    if isinstance(m, dict):
        return m.get("like_count", 0)
    return getattr(m, "like_count", 0)


def main():
    # EN: Must use access_token= (User OAuth 2.0), NOT bearer_token=.
    # 中文：必须用 access_token= 传入，bearer_token= 是只读的 App token。
    client = Client(access_token=get_access_token(TWITTER_ID))

    print(f"Searching tweets for topic {TOPIC!r}...")

    tweets = []
    try:
        for page in client.posts.search_recent(
            query=TOPIC,
            max_results=20,
            tweet_fields=["public_metrics", "text", "author_id"],
        ):
            tweets.extend(page.data or [])
            break  # EN: One page per run is enough. / 每次运行取一页即可。
    except Exception as e:
        err_body = getattr(getattr(e, "response", None), "text", "") or str(e)
        print(f"ERROR: Search failed: {err_body}")
        sys.exit(1)

    if not tweets:
        print("No tweets found / 未找到推文")
        return

    # EN: Sort by likes descending, then apply MIN_LIKES filter.
    # 中文：按点赞数降序排序，再过滤低于门槛的推文。
    sorted_tweets = sorted(tweets, key=get_likes, reverse=True)
    top_tweets = [t for t in sorted_tweets if get_likes(t) >= MIN_LIKES][:TOP_N]

    if not top_tweets:
        print(f"No tweets with >= {MIN_LIKES} likes / 没有点赞数达到 {MIN_LIKES} 的推文")
        return

    print(f"Retweeting top {len(top_tweets)} tweet(s) / 转推前 {len(top_tweets)} 条...")

    for t in top_tweets:
        tweet_id = t.get("id") if isinstance(t, dict) else t.id
        text     = (t.get("text", "") if isinstance(t, dict) else getattr(t, "text", "") or "")[:80]
        likes    = get_likes(t)
        print(f"  [{likes} likes] {tweet_id}: {text!r}")
        try:
            # EN: repost_post uses body with target_tweet_id.
            # 中文：repost_post 需要 body 中包含 target_tweet_id。
            client.users.repost_post(
                id=TWITTER_ID,
                body={"tweet_id": tweet_id},
            )
            print(f"  ✓ Retweeted / 已转推 {tweet_id}")
        except Exception as e:
            err_body = getattr(getattr(e, "response", None), "text", "") or str(e)
            print(f"  Retweet failed: {err_body}")
        time.sleep(DELAY_SECONDS)

    print("Done / 完成")


if __name__ == "__main__":
    main()
