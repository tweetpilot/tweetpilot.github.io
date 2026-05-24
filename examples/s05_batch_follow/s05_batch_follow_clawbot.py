"""
S05 · Batch Follow — ClawBot SDK
===================================
EN: Follow a list of user IDs in bulk via the TweetClaw browser extension.
    Adds a configurable delay between each follow to avoid rate-limiting.
    No OAuth token needed — uses the browser extension as proxy.
中文：通过 TweetClaw 浏览器扩展批量关注一组用户 ID。
     每次关注之间加入可配置的延迟，避免触发限流。
     无需 OAuth token，以浏览器扩展作为代理。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import time
from clawbot import ClawBotClient

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: List of numeric Twitter user IDs to follow.
# 中文：要关注的 Twitter 用户数字 ID 列表。
TARGET_IDS = [
    "44196397",   # @elonmusk
    "27259332",   # @jensenhuang (Jensen Huang)
]

# EN: Seconds to wait between each follow request. Keep ≥ 3 to avoid rate limits.
# 中文：每次关注请求之间的等待秒数，建议 ≥ 3 秒，避免触发限流。
DELAY_SECONDS = 5


def main():
    client = ClawBotClient()

    # EN: Auto-select the first connected TweetClaw instance.
    # 中文：自动选择第一个已连接的 TweetClaw 实例。
    instances = client.x.status.get_instances()
    instance_id = None
    if isinstance(instances, list) and instances:
        instance_id = instances[0].get("instanceId") or instances[0].get("id")

    total = len(TARGET_IDS)
    for i, user_id in enumerate(TARGET_IDS):
        print(f"Following {user_id} ({i + 1}/{total})...")
        try:
            # EN: follow() calls POST /api/v1/x/follows via LocalBridge.
            # 中文：follow() 通过 LocalBridge 调用 POST /api/v1/x/follows。
            result = client.x.actions.follow(user_id=user_id, instance_id=instance_id)
            print(f"  Done / 完成: {result}")
        except Exception as e:
            print(f"  Failed / 失败: {e}")
            sys.exit(1)

        # EN: Wait between follows — skip delay after the last one.
        # 中文：每次关注后等待，最后一条不等待。
        if i < total - 1:
            time.sleep(DELAY_SECONDS)

    print(f"\nAll done / 全部完成: followed {total} users")


if __name__ == "__main__":
    main()
