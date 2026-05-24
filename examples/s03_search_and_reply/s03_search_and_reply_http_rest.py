"""
S03 · Search & Auto-Reply — HTTP REST API (LocalBridge)
=========================================================
EN: Search tweets by keyword via LocalBridge, then reply to each result.
    Uses the browser extension as proxy — no OAuth token needed.
    Requires TweetClaw extension online in the browser.
中文：通过 LocalBridge 搜索关键词推文，然后逐条回复。
     以浏览器扩展作为代理，无需 OAuth token。
     需要 TweetClaw 扩展在浏览器中保持在线。

Note / 说明:
  This tab demonstrates LocalBridge (browser-extension) access via raw HTTP.
  If you want to call Twitter's official API directly, refer to:
  https://developer.x.com/en/docs/x-api
  注：本示例演示通过裸 HTTP 调用 LocalBridge（浏览器扩展代理）。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import time
import requests

# ── Config / 配置 ────────────────────────────────────────────────────
LOCAL_BRIDGE = "http://127.0.0.1:20088"
SEARCH_QUERY = "TweetPilot"   # ← Keyword to search / 搜索关键词
REPLY_TEXT   = "Thanks for mentioning us! 🙌 — TweetPilot"

# EN: ⚠️ Only reply to the FIRST result — replying to many tweets at once
#     risks triggering Twitter's rate-limit or spam detection.
#     Run this on a schedule (e.g. every 30 min) to stay safe.
# 中文：⚠️ 只回复第一条结果。批量回复极易触发推特限流或垃圾行为检测。
#      建议配合定时任务（如每 30 分钟一次）分散回复频率。


def search_tweets(query: str, count: int) -> list:
    """
    EN: Search tweets via LocalBridge GET /api/v1/x/search.
        Returns a flat list of tweet dicts with id + text.
    中文：通过 LocalBridge GET /api/v1/x/search 搜索推文。
         返回含 id 和 text 的推文字典列表。
    """
    try:
        resp = requests.get(
            f"{LOCAL_BRIDGE}/api/v1/x/search",
            params={"query": query, "count": count},
            timeout=15,
        )
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)

    raw = resp.json()

    # EN: Parse tweet entries from the raw Twitter GraphQL response.
    #     LocalBridge wraps the response: {"success": true, "data": {<Twitter GraphQL>}}
    # 中文：从原始 Twitter GraphQL 响应中解析推文条目。
    #      LocalBridge 包了一层：{"success": true, "data": {<Twitter GraphQL>}}
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
                tweet = result.get("tweet") or result
                legacy   = tweet.get("legacy", {})
                rest_id  = tweet.get("rest_id") or result.get("rest_id")
                if rest_id:
                    tweets.append({
                        "id":   rest_id,
                        "text": legacy.get("full_text", ""),
                    })
    except Exception as e:
        print(f"WARNING: Could not parse search results: {e}")

    return tweets


def reply_to_tweet(tweet_id: str, text: str) -> str:
    """
    EN: Reply to a tweet via LocalBridge POST /api/v1/x/replies.
        Returns tweet_id of the reply on success.
    中文：通过 LocalBridge POST /api/v1/x/replies 回复推文。
         成功时返回回复推文的 ID。
    """
    resp = requests.post(
        f"{LOCAL_BRIDGE}/api/v1/x/replies",
        json={"tweetId": tweet_id, "text": text},
        timeout=15,
    )
    resp.raise_for_status()
    data   = resp.json()
    errors = data.get("data", {}).get("errors")
    if errors:
        msgs = [f"code {e.get('code')}: {e.get('message')}" for e in errors]
        raise RuntimeError("; ".join(msgs))

    try:
        reply_id = data["data"]["data"]["create_tweet"]["tweet_results"]["result"]["rest_id"]
    except (KeyError, TypeError):
        reply_id = "unknown"
    return reply_id


def main():
    print(f"Searching / 搜索中: \"{SEARCH_QUERY}\"")
    tweets = search_tweets(SEARCH_QUERY, count=10)

    if not tweets:
        print("No tweets found / 未找到相关推文")
        sys.exit(1)

    # EN: Try each tweet in order; skip retweets; on failure move to next.
    # 中文：按顺序尝试每条推文；跳过转发；失败则换下一条。
    replied = False
    for tweet in tweets:
        tweet_id = tweet["id"]
        text     = tweet["text"]
        if text.startswith("RT @"):
            continue
        print(f"Trying tweet {tweet_id}: {text[:60]!r}")
        try:
            reply_id = reply_to_tweet(tweet_id, REPLY_TEXT)
            print(f"Done / 完成, reply ID: {reply_id}")
            replied = True
            break
        except Exception as e:
            print(f"  Skipped: {e}")
            continue

    if not replied:
        print("Failed / 失败: no replyable tweet found / 搜索结果中无可回复推文")
        sys.exit(1)


if __name__ == "__main__":
    main()
