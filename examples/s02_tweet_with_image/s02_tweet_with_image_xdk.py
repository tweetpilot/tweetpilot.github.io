"""
S02 · Tweet with Image — xdk SDK
===================================
EN: Upload an image via Twitter's media API and attach it to a tweet.
    TweetPilot provides the OAuth access token automatically.
    Requires OAuth account authorized in TweetPilot Account Settings.
中文：通过 Twitter media API 上传图片并发推。
     TweetPilot 自动提供 OAuth access token，无需手动配置。
     需要在 TweetPilot 账号设置中完成 OAuth 授权（x 开头的账号）。

⚠️  Media upload scope note / 媒体上传权限说明:
    client.media.upload() calls POST /2/media/upload which requires
    the 'media.write' OAuth 2.0 scope in addition to 'tweet.write'.
    If you see 403 on upload, ensure your OAuth app has 'media.write'
    scope and re-authorize via TweetPilot.
    client.media.upload() 调用 POST /2/media/upload，除 tweet.write 外
    还需要 media.write scope。若上传时遇到 403，请确认 OAuth App 已包含
    media.write 权限并在 TweetPilot 重新授权。

Requirements / 依赖:
  pip install xdk requests
  TweetPilot running + OAuth account authorized in Account Settings
"""

import sys
import os
import base64
import requests
from xdk import Client

# ── Config / 配置 ────────────────────────────────────────────────────
TWITTER_ID = "YOUR_TWITTER_ID"  # ← Replace with your numeric Twitter ID (OAuth accounts only)
IMAGE_PATH = "image.jpg"        # ← Replace with your image path / 替换为你的图片路径
TWEET_TEXT = "🚀 TweetPilot v1 is live — the Social AI Agent built for X.\nAutomate posts, replies, likes & research while you stay focused.\nBuilt for creators, builders & teams → tweetpilot.ai"


def get_access_token(twitter_id: str) -> str:
    """
    EN: Fetch OAuth token from TweetPilot rust-bridge (port 20088).
    中文：从 TweetPilot rust-bridge 获取 OAuth token。
    """
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

    if not os.path.exists(IMAGE_PATH):
        print(f"ERROR: Image file not found: {IMAGE_PATH}")
        print(f"错误：找不到图片文件 {IMAGE_PATH}，请检查路径。")
        sys.exit(1)

    # EN: Must use access_token= (User OAuth 2.0), NOT bearer_token= (App-level, read-only).
    # 中文：必须用 access_token= 传入，不能用 bearer_token=（App 级只读，写操作会报错）。
    client = Client(access_token=get_access_token(TWITTER_ID))

    # EN: Read image and encode as base64 for Twitter's media upload API.
    #     Requires 'media.write' OAuth scope — see note at top of file.
    # 中文：读取图片并 base64 编码，传给 Twitter media upload 接口。
    #      需要 media.write OAuth scope，详见文件顶部说明。
    print(f"Uploading image / 上传图片: {IMAGE_PATH}")
    with open(IMAGE_PATH, "rb") as f:
        media_b64 = base64.b64encode(f.read()).decode()

    try:
        upload_result = client.media.upload(body={
            "media": media_b64,
            "media_category": "tweet_image",
        })
    except Exception as e:
        print(f"Failed / 上传失败: {e}")
        if hasattr(e, "response") and e.response is not None:
            print(f"Error body: {e.response.text}")
        sys.exit(1)

    media_id = upload_result.data["id"] if isinstance(upload_result.data, dict) else upload_result.data.id
    print(f"Upload done / 上传完成, media_id: {media_id}")

    # EN: Create tweet with the uploaded media_id attached.
    # 中文：带 media_id 发推。
    try:
        result = client.posts.create(body={
            "text": TWEET_TEXT,
            "media": {"media_ids": [media_id]},
        })
    except Exception as e:
        print(f"Failed / 发推失败: {e}")
        if hasattr(e, "response") and e.response is not None:
            print(f"Error body: {e.response.text}")
        sys.exit(1)

    tweet_id = result.data["id"] if isinstance(result.data, dict) else result.data.id
    print(f"Tweet sent / 发推成功: {TWEET_TEXT[:50]}...")
    print(f"Tweet ID: {tweet_id}")


if __name__ == "__main__":
    main()
