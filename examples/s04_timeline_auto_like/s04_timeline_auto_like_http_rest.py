"""
S04 · Timeline Auto-Like — HTTP REST API (LocalBridge)
========================================================
EN: Read the home timeline via LocalBridge and like the first tweet that
    matches a keyword filter. Only likes ONE tweet per run.
    Uses the browser extension as proxy — no OAuth token needed.
    Requires TweetClaw extension online in the browser.
中文：通过 LocalBridge 读取主页时间线，对第一条匹配关键词的推文点赞。
     每次只点赞一条，避免触发限流。
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
KEYWORD      = "AI"   # ← Keyword filter (case-insensitive) / 关键词过滤（不区分大小写）

# EN: ⚠️ Only likes ONE matching tweet per run.
#     Run on a schedule (e.g. every 30 min) to stay within rate limits.
# 中文：⚠️ 每次只点赞一条匹配推文，建议每 30 分钟以上定时执行。


def get_timeline_tweets() -> list:
    """
    EN: Fetch home timeline via LocalBridge GET /api/v1/x/timeline.
        Returns a flat list of tweet dicts with id + text.
    中文：通过 LocalBridge GET /api/v1/x/timeline 获取主页时间线。
         返回含 id 和 text 的推文字典列表。
    """
    try:
        resp = requests.get(f"{LOCAL_BRIDGE}/api/v1/x/timeline", timeout=15)
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)

    tweets = []
    try:
        instructions = (
            resp.json()
                .get("data", {})
                .get("data", {})
                .get("home", {})
                .get("home_timeline_urt", {})
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
                text    = tweet.get("legacy", {}).get("full_text", "")
                if rest_id:
                    tweets.append({"id": rest_id, "text": text})
    except Exception as e:
        print(f"WARNING: Could not parse timeline: {e}")

    return tweets


def like_tweet(tweet_id: str) -> None:
    """
    EN: Like a tweet via LocalBridge POST /api/v1/x/likes.
    中文：通过 LocalBridge POST /api/v1/x/likes 点赞推文。
    """
    resp = requests.post(
        f"{LOCAL_BRIDGE}/api/v1/x/likes",
        json={"tweetId": tweet_id},
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    if not data.get("ok"):
        raise RuntimeError(f"Like failed: {data}")


def main():
    print("Fetching timeline / 获取时间线...")
    tweets = get_timeline_tweets()

    if not tweets:
        print("No tweets in timeline / 时间线为空")
        return

    # EN: Find the first tweet matching the keyword filter.
    # 中文：找出第一条包含关键词的推文。
    target = None
    for tweet in tweets:
        if not KEYWORD or KEYWORD.lower() in tweet["text"].lower():
            target = tweet
            break

    if not target:
        print(f"No tweet matched keyword \"{KEYWORD}\" / 未找到包含关键词的推文")
        return

    print(f"Liking tweet {target['id']}: {target['text'][:60]!r}")

    try:
        like_tweet(target["id"])
        print(f"Done / 完成: liked tweet {target['id']}")
    except Exception as e:
        print(f"Failed / 失败: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
