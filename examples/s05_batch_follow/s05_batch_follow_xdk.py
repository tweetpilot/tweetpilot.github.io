"""
S05 · Batch Follow — xdk SDK
================================
EN: Follow a list of user IDs in bulk via Twitter API v2.
    TweetPilot provides the OAuth access token automatically.
    Adds a configurable delay between each follow to avoid rate-limiting.
    Requires OAuth account authorized in TweetPilot Account Settings.
中文：通过 Twitter API v2 批量关注一组用户 ID。
     TweetPilot 自动提供 OAuth access token，需 x 开头的 OAuth 授权账号。
     每次关注之间加入可配置的延迟，避免触发限流。

Requirements / 依赖:
  pip install xdk requests
  TweetPilot running + OAuth account authorized in Account Settings
"""

import sys
import time
import requests
from xdk import Client

# ── Config / 配置 ────────────────────────────────────────────────────
TWITTER_ID = "1735224873365225472"  # ← OAuth account numeric ID / OAuth 账号数字 ID

# EN: List of numeric Twitter user IDs to follow.
# 中文：要关注的 Twitter 用户数字 ID 列表。
TARGET_IDS = [
    "44196397",   # @elonmusk
    "27259332",   # @jensenhuang (Jensen Huang)
]

# EN: Seconds to wait between each follow request. Keep ≥ 3 to avoid rate limits.
# 中文：每次关注请求之间的等待秒数，建议 ≥ 3 秒，避免触发限流。
DELAY_SECONDS = 5


def get_access_token(twitter_id: str) -> str:
    try:
        resp = requests.post(
            "http://127.0.0.1:20088/api/v1/x/oauth/access-token",
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


def main():
    if TWITTER_ID == "YOUR_TWITTER_ID":
        print("ERROR: Please set TWITTER_ID to your numeric Twitter account ID.")
        print("错误：请将 TWITTER_ID 替换为你的数字 Twitter 账号 ID（仅限 OAuth 授权账号）。")
        sys.exit(1)

    # EN: Must use access_token= (User OAuth 2.0), NOT bearer_token= (read-only).
    # 中文：必须用 access_token= 传入，bearer_token= 是只读的 App token。
    client = Client(access_token=get_access_token(TWITTER_ID))

    total = len(TARGET_IDS)
    for i, target_id in enumerate(TARGET_IDS):
        print(f"Following {target_id} ({i + 1}/{total})...")
        try:
            # EN: follow_user requires your own user ID and the target user's ID.
            # 中文：follow_user 需要传入自己的用户 ID 和目标用户 ID。
            client.users.follow_user(
                id=TWITTER_ID,
                body={"target_user_id": target_id},
            )
            print(f"  Done / 完成: followed {target_id}")
        except Exception as e:
            err_body = ""
            if hasattr(e, "response") and e.response is not None:
                err_body = e.response.text
            print(f"  Failed / 失败: {err_body or e}")
            sys.exit(1)

        if i < total - 1:
            time.sleep(DELAY_SECONDS)

    print(f"\nAll done / 全部完成: followed {total} users")


if __name__ == "__main__":
    main()
