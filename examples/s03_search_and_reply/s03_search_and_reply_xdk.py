"""
S03 · Search & Auto-Reply — xdk SDK
=======================================
EN: Search recent tweets via Twitter API v2, reply to the first replyable result.
    TweetPilot provides the OAuth access token automatically.
    Requires OAuth account authorized in TweetPilot Account Settings.
中文：通过 Twitter API v2 搜索推文，回复第一条可回复的推文。
     TweetPilot 自动提供 OAuth access token，需在账号设置中完成 OAuth 授权。

Requirements / 依赖:
  pip install xdk requests
  TweetPilot running + OAuth account authorized in Account Settings
"""

import sys
import requests
from xdk import Client

# ── Config / 配置 ────────────────────────────────────────────────────
TWITTER_ID   = "YOUR_TWITTER_ID"  # ← OAuth account numeric ID / OAuth 账号数字 ID
SEARCH_QUERY = "TweetPilot"       # ← Keyword to search / 搜索关键词
REPLY_TEXT   = "Thanks for mentioning us! 🙌 — TweetPilot"

# EN: ⚠️ Only reply to the FIRST replyable result.
#     Run this on a schedule (e.g. every 30 min) to stay within rate limits.
# 中文：⚠️ 只回复第一条可回复的推文，建议每 30 分钟以上定时执行一次。


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
    # 中文：必须用 access_token= 传入，bearer_token= 是只读的 App token，写操作会报错。
    client = Client(access_token=get_access_token(TWITTER_ID))

    # EN: search_recent requires max_results 10–100.
    # 中文：search_recent 要求 max_results 在 10–100 之间。
    print(f"Searching / 搜索中: \"{SEARCH_QUERY}\"")
    first_page = next(iter(
        client.posts.search_recent(query=SEARCH_QUERY, max_results=10)
    ), None)
    tweets = (first_page.data or []) if first_page else []

    if not tweets:
        print("No tweets found / 未找到相关推文")
        return

    # EN: Try each tweet in order; skip retweets; on 403 move to next.
    # 中文：按顺序尝试每条推文；跳过转发；遇到 403 换下一条。
    replied = False
    for t in tweets:
        t_text   = (t.get("text") if isinstance(t, dict) else getattr(t, "text", "") or "")
        tweet_id = (t.get("id")   if isinstance(t, dict) else t.id)

        if t_text.startswith("RT @"):
            continue

        print(f"Trying tweet {tweet_id}: {t_text[:60]!r}")
        try:
            result = client.posts.create(body={
                "text":  REPLY_TEXT,
                "reply": {"in_reply_to_tweet_id": tweet_id},
            })
            reply_id = (result.data["id"] if isinstance(result.data, dict)
                        else result.data.id)
            print(f"Done / 完成, reply ID: {reply_id}")
            replied = True
            break
        except Exception as e:
            err_body = ""
            if hasattr(e, "response") and e.response is not None:
                err_body = e.response.text
            print(f"  Skipped (reply not allowed): {err_body or e}")
            continue

    if not replied:
        print("Failed / 失败: no replyable tweet found in results / 搜索结果中无可回复推文")
        sys.exit(1)


if __name__ == "__main__":
    main()
