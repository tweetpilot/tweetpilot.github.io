"""
S04 · Timeline Auto-Like — ClawBot SDK
=========================================
EN: Read the home timeline and like the first tweet that matches a keyword filter.
    Only likes ONE tweet per run to avoid rate-limiting.
    Requires TweetClaw extension online in the browser.
中文：读取主页时间线，对第一条匹配关键词的推文点赞。
     每次只点赞一条，避免触发限流。
     需要 TweetClaw 扩展在浏览器中保持在线。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
from clawbot import ClawBotClient

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: Only like tweets whose text contains this keyword (case-insensitive).
#     Set to "" to like the first tweet regardless of content.
# 中文：只点赞包含此关键词的推文（不区分大小写）。
#      设为 "" 则点赞时间线第一条推文，不做内容过滤。
KEYWORD = "AI"

# EN: ⚠️ Only likes ONE matching tweet per run.
#     Run on a schedule (e.g. every 30 min) to stay within rate limits.
# 中文：⚠️ 每次只点赞一条匹配推文。
#      建议配合定时任务（如每 30 分钟一次）避免触发限流。


def main():
    client = ClawBotClient()

    # EN: Resolve instance_id for multi-extension environments.
    # 中文：多扩展实例环境下，获取第一个可用的 instanceId。
    instances = client.x.status.get_instances()
    instance_id = None
    if isinstance(instances, list) and instances:
        instance_id = instances[0].get("instanceId") or instances[0].get("id")

    # EN: Fetch home timeline tweets.
    # 中文：获取主页时间线推文列表。
    print("Fetching timeline / 获取时间线...")
    tweets = client.x.timeline.list_timeline_tweets(instance_id=instance_id)

    if not tweets:
        print("No tweets in timeline / 时间线为空")
        return

    # EN: Find the first tweet matching the keyword filter.
    # 中文：找出第一条包含关键词的推文。
    target = None
    for tweet in tweets:
        text = getattr(tweet, "text", "") or ""
        if not KEYWORD or KEYWORD.lower() in text.lower():
            target = tweet
            break

    if not target:
        print(f"No tweet matched keyword \"{KEYWORD}\" / 未找到包含关键词的推文")
        return

    text_preview = (getattr(target, "text", "") or "")[:60]
    print(f"Liking tweet {target.id}: {text_preview!r}")

    try:
        result = client.x.actions.like(tweet_id=target.id, instance_id=instance_id)
        print(f"Done / 完成: {result}")
    except Exception as e:
        print(f"Failed / 失败: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
