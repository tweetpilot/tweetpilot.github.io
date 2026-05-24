"""
S03 · Search & Auto-Reply — ClawBot SDK
==========================================
EN: Search tweets by keyword and automatically reply to matching results.
    Useful for brand monitoring, audience engagement, or keyword-triggered responses.
    Requires TweetClaw extension online in the browser.
中文：按关键词搜索推文，并自动回复匹配结果。
     适用于品牌监控、用户互动或关键词触发的自动响应场景。
     需要 TweetClaw 扩展在浏览器中保持在线。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import time
from clawbot import ClawBotClient

# ── Config / 配置 ────────────────────────────────────────────────────
SEARCH_QUERY = "TweetPilot"   # ← Keyword to search / 搜索关键词
REPLY_TEXT   = "Thanks for mentioning us! 🙌 — TweetPilot"  # ← Reply content / 回复内容

# EN: ⚠️ Only reply to the FIRST result — replying to many tweets at once
#     risks triggering Twitter's rate-limit or spam detection.
#     Run this on a schedule (e.g. every 30 min) to stay safe.
# 中文：⚠️ 只回复第一条结果。批量回复极易触发推特限流或垃圾行为检测。
#      建议配合定时任务（如每 30 分钟一次）分散回复频率。


def main():
    client = ClawBotClient()

    # EN: Resolve instance_id for multi-extension environments.
    # 中文：多扩展实例环境下，获取第一个可用的 instanceId。
    instances = client.x.status.get_instances()
    instance_id = None
    if isinstance(instances, list) and instances:
        instance_id = instances[0].get("instanceId") or instances[0].get("id")

    # EN: Fetch a small batch, then reply ONLY to the first result.
    # 中文：搜索一批结果，但只回复第一条，避免批量回复触发限流。
    print(f"Searching / 搜索中: \"{SEARCH_QUERY}\"")
    tweets = client.x.search.search_tweets(
        SEARCH_QUERY, count=5, instance_id=instance_id
    )

    if not tweets:
        print("No tweets found / 未找到相关推文")
        return

    # EN: Take only the first tweet — do NOT loop over all results.
    # 中文：只取第一条，不循环全部结果。
    tweet    = tweets[0]
    tweet_id = tweet.id
    author   = getattr(tweet, "screen_name", None) or getattr(tweet, "author_id", "?")
    text     = getattr(tweet, "text", "")[:60]

    print(f"Replying to @{author}: {text!r}")
    try:
        result = client.x.actions.reply(
            tweet_id=tweet_id,
            text=REPLY_TEXT,
            instance_id=instance_id,
        )
        print(f"Done / 完成: {result}")
    except Exception as e:
        print(f"Failed / 失败: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
