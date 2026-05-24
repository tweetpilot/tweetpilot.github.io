"""
S02 · Tweet with Image — ClawBot SDK
======================================
EN: Upload a local image and post it as a tweet via the browser extension.
    ClawBot handles the chunked upload and tweet creation in one call.
    Requires TweetClaw extension online in the browser.
中文：通过浏览器扩展上传本地图片并发推。
     ClawBot 封装了分块上传和发推的完整流程，一行调用即可完成。
     需要 TweetClaw 扩展在浏览器中保持在线。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import os
from clawbot import ClawBotClient

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: Path to the image file you want to attach. Supports jpg / png / gif / webp.
# 中文：要附加的图片路径，支持 jpg / png / gif / webp。
IMAGE_PATH = "image.jpg"  # ← Replace with your image path / 替换为你的图片路径

TWEET_TEXT = "🚀 TweetPilot v1 is live — the Social AI Agent built for X.\nAutomate posts, replies, likes & research while you stay focused.\nBuilt for creators, builders & teams → tweetpilot.ai"


def main():
    # EN: Guard: make sure the image file exists before running.
    # 中文：运行前检查图片文件是否存在。
    if not os.path.exists(IMAGE_PATH):
        print(f"ERROR: Image file not found: {IMAGE_PATH}")
        print(f"错误：找不到图片文件 {IMAGE_PATH}，请检查路径。")
        sys.exit(1)

    client = ClawBotClient()

    # EN: Resolve instance_id for multi-extension environments.
    # 中文：多扩展实例环境下，获取第一个可用的 instanceId 进行路由。
    instances = client.x.status.get_instances()
    instance_id = None
    if isinstance(instances, list) and instances:
        instance_id = instances[0].get("instanceId") or instances[0].get("id")

    # EN: post_tweet() uploads the image then creates the tweet in one call.
    # 中文：post_tweet() 内部自动完成上传 + 发推，无需手动处理 media_id。
    result = client.media.post_tweet(
        text=TWEET_TEXT,
        file_paths=[IMAGE_PATH],
        instance_id=instance_id,
    )

    print(f"Tweet sent / 发推成功: {TWEET_TEXT}")
    print(f"Result: {result}")


if __name__ == "__main__":
    main()
