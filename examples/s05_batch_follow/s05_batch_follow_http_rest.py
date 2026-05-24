"""
S05 · Batch Follow — HTTP REST API (LocalBridge)
==================================================
EN: Follow a list of user IDs in bulk via LocalBridge.
    Adds a configurable delay between each follow to avoid rate-limiting.
    Uses the browser extension as proxy — no OAuth token needed.
    Requires TweetClaw extension online in the browser.
中文：通过 LocalBridge 批量关注一组用户 ID。
     每次关注之间加入可配置的延迟，避免触发限流。
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

# EN: List of numeric Twitter user IDs to follow.
# 中文：要关注的 Twitter 用户数字 ID 列表。
TARGET_IDS = [
    "44196397",   # @elonmusk
    "27259332",   # @jensenhuang (Jensen Huang)
]

# EN: Seconds to wait between each follow request. Keep ≥ 3 to avoid rate limits.
# 中文：每次关注请求之间的等待秒数，建议 ≥ 3 秒，避免触发限流。
DELAY_SECONDS = 5


def follow_user(user_id: str) -> None:
    """
    EN: Follow a user via LocalBridge POST /api/v1/x/follows.
    中文：通过 LocalBridge POST /api/v1/x/follows 关注用户。
    """
    try:
        resp = requests.post(
            f"{LOCAL_BRIDGE}/api/v1/x/follows",
            json={"userId": user_id},
            timeout=15,
        )
        resp.raise_for_status()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"ERROR: {e.response.status_code} — {e.response.text}")
        sys.exit(1)

    data = resp.json()
    if not data.get("ok") and not data.get("success"):
        raise RuntimeError(f"Follow failed: {data}")


def main():
    total = len(TARGET_IDS)
    for i, user_id in enumerate(TARGET_IDS):
        print(f"Following {user_id} ({i + 1}/{total})...")
        try:
            follow_user(user_id)
            print(f"  Done / 完成: followed {user_id}")
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
