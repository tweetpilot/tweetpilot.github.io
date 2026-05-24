"""
S06 · Tweet Metrics Report — HTTP REST API (LocalBridge)
==========================================================
EN: Fetch engagement metrics (likes, retweets, replies, bookmarks) for a
    specific tweet via LocalBridge and print a report.
    Uses the browser extension as proxy — no OAuth token needed.
    Requires TweetClaw extension online in the browser.
中文：通过 LocalBridge 获取指定推文的互动数据
     （点赞、转推、回复、书签）并打印报告。
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
import requests

# ── Config / 配置 ────────────────────────────────────────────────────
LOCAL_BRIDGE = "http://127.0.0.1:20088"

# EN: Replace with the numeric tweet ID you want to inspect.
# 中文：替换为你要查看的推文数字 ID。
TWEET_ID = "2058496416046297229"  # ← Replace with target tweet ID / 替换为目标推文 ID


def get_tweet(tweet_id: str) -> dict:
    """
    EN: Fetch a tweet via LocalBridge GET /api/v1/x/tweets?tweetId=<id>.
    中文：通过 LocalBridge GET /api/v1/x/tweets?tweetId=<id> 获取推文。
    """
    try:
        resp = requests.get(
            f"{LOCAL_BRIDGE}/api/v1/x/tweets",
            params={"tweetId": tweet_id},
            timeout=15,
        )
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)

    # EN: LocalBridge wraps response: {"ok": true, "data": {"data": {...GraphQL...}}}
    # 中文：LocalBridge 包装响应：{"ok": true, "data": {"data": {...GraphQL...}}}
    raw = resp.json()
    return raw.get("data", {}).get("data", {})


def main():
    print(f"Fetching tweet {TWEET_ID}...")
    data = get_tweet(TWEET_ID)

    if not data:
        print("ERROR: Tweet not found / 未找到该推文")
        sys.exit(1)

    # EN: Navigate GraphQL threaded_conversation response to find the focal tweet.
    # 中文：从 GraphQL threaded_conversation 响应中提取目标推文。
    instructions = (
        data.get("threaded_conversation_with_injections_v2", {})
            .get("instructions", [])
    )
    tweet = None
    for instr in instructions:
        for entry in instr.get("entries", []):
            item = entry.get("content", {}).get("itemContent", {})
            if item.get("itemType") == "TimelineTweet":
                result = item.get("tweet_results", {}).get("result", {})
                # EN: Handle TweetWithVisibilityResults wrapper.
                # 中文：兼容 TweetWithVisibilityResults 包装格式。
                tweet = result.get("tweet") or result
                break
        if tweet:
            break

    if not tweet:
        print("ERROR: Could not parse tweet data / 无法解析推文数据")
        sys.exit(1)

    legacy  = tweet.get("legacy", {})
    core    = tweet.get("core", {})
    user_result = core.get("user_results", {}).get("result", {})
    user_core   = user_result.get("core", {})
    # EN: screen_name lives in user_result.core.screen_name (not legacy).
    # 中文：screen_name 在 user_result.core.screen_name 中。
    screen_name = user_core.get("screen_name") or user_result.get("legacy", {}).get("screen_name", "unknown")

    text      = legacy.get("full_text", "")
    likes     = legacy.get("favorite_count", "N/A")
    retweets  = legacy.get("retweet_count",  "N/A")
    replies   = legacy.get("reply_count",    "N/A")
    quotes    = legacy.get("quote_count",    "N/A")
    bookmarks = legacy.get("bookmark_count", "N/A")

    print(f"\n── Tweet Metrics Report / 推文互动报告 ──")
    print(f"ID        : {TWEET_ID}")
    print(f"Author    : @{screen_name}")
    print(f"Text      : {text[:120]}")
    print(f"Likes     : {likes}")
    print(f"Retweets  : {retweets}")
    print(f"Replies   : {replies}")
    print(f"Quotes    : {quotes}")
    print(f"Bookmarks : {bookmarks}")


if __name__ == "__main__":
    main()
