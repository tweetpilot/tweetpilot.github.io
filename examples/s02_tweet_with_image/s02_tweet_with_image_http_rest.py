"""
S02 · Tweet with Image — HTTP REST API (LocalBridge)
======================================================
EN: Upload an image via LocalBridge task API, then post a tweet with the media ID.
    Uses the browser extension as proxy — no OAuth token needed.
    Requires TweetClaw extension online in the browser.
中文：通过 LocalBridge task API 上传图片，再带 media_id 发推。
     以浏览器扩展作为代理，无需 OAuth token。
     需要 TweetClaw 扩展在浏览器中保持在线。

Note / 说明:
  Media upload uses LocalBridge's async task API (multi-step).
  If you want to call Twitter's official media API directly, refer to:
  https://developer.x.com/en/docs/x-api
  注：媒体上传使用 LocalBridge 异步 task API（多步骤流程）。
  如需直接调用推特官方媒体 API，请参考推特官方文档。

Requirements / 依赖:
  pip install requests
  TweetPilot running + TweetClaw browser extension online
"""

import sys
import os
import time
import mimetypes
import requests

# ── Config / 配置 ────────────────────────────────────────────────────
LOCAL_BRIDGE = "http://127.0.0.1:20088"
IMAGE_PATH   = "image.jpg"  # ← Replace with your image path / 替换为你的图片路径
TWEET_TEXT   = "🚀 TweetPilot v1 is live — the Social AI Agent built for X.\nAutomate posts, replies, likes & research while you stay focused.\nBuilt for creators, builders & teams → tweetpilot.ai"


def get_instance_id() -> str:
    """
    EN: Get the first available TweetClaw instance ID for routing.
    中文：获取第一个可用的 TweetClaw 实例 ID，用于请求路由。
    """
    resp = requests.get(f"{LOCAL_BRIDGE}/api/v1/x/instances", timeout=10)
    resp.raise_for_status()
    instances = resp.json()
    if not instances:
        print("ERROR: No TweetClaw instances connected / 没有已连接的 TweetClaw 实例")
        sys.exit(1)
    return instances[0]["instanceId"]


def upload_image(file_path: str, instance_id: str) -> str:
    """
    EN: Upload an image via LocalBridge task API. Returns the media_id string.
        Steps: create task → upload chunks → seal → start → poll → get result
    中文：通过 LocalBridge task API 上传图片，返回 media_id 字符串。
         步骤：创建任务 → 上传分块 → 封装 → 启动 → 轮询 → 获取结果
    """
    file_size    = os.path.getsize(file_path)
    content_type = mimetypes.guess_type(file_path)[0] or "image/jpeg"

    # EN: Step 1 — Create upload task
    # 中文：第一步 — 创建上传任务
    task_resp = requests.post(f"{LOCAL_BRIDGE}/api/v1/tasks", json={
        "clientName": "tweetClaw",
        "instanceId": instance_id,
        "taskKind": "x.media_upload",
        "inputMode": "chunked_binary",
        "params": {},
    }, timeout=10)
    task_resp.raise_for_status()
    task_id = task_resp.json()["taskId"]

    # EN: Step 2 — Upload file in one chunk (suitable for images < 5 MB)
    # 中文：第二步 — 单块上传（适合小于 5 MB 的图片）
    with open(file_path, "rb") as f:
        data = f.read()
    requests.put(
        f"{LOCAL_BRIDGE}/api/v1/tasks/{task_id}/input/0",
        data=data,
        headers={"Content-Type": "application/octet-stream"},
        timeout=30,
    ).raise_for_status()

    # EN: Step 3 — Seal input (tell LocalBridge how many chunks were uploaded)
    # 中文：第三步 — 封装输入（告知 LocalBridge 上传了多少分块）
    requests.post(f"{LOCAL_BRIDGE}/api/v1/tasks/{task_id}/seal", json={
        "totalParts": 1,
        "totalBytes": file_size,
        "contentType": content_type,
    }, timeout=10).raise_for_status()

    # EN: Step 4 — Start the task (triggers browser extension to upload to Twitter)
    # 中文：第四步 — 启动任务（触发浏览器扩展向 Twitter 上传）
    requests.post(f"{LOCAL_BRIDGE}/api/v1/tasks/{task_id}/start", timeout=10).raise_for_status()

    # EN: Step 5 — Poll until completed (timeout: 60s)
    # 中文：第五步 — 轮询直到完成（超时 60 秒）
    deadline = time.time() + 60
    while time.time() < deadline:
        status = requests.get(f"{LOCAL_BRIDGE}/api/v1/tasks/{task_id}", timeout=10).json()
        state  = status.get("state")
        if state == "completed":
            break
        if state in ("failed", "cancelled"):
            print(f"ERROR: Upload task {state}: {status.get('errorMessage')}")
            sys.exit(1)
        time.sleep(2)
    else:
        print("ERROR: Upload timed out / 上传超时")
        sys.exit(1)

    # EN: Step 6 — Fetch result to get media_id
    # 中文：第六步 — 获取结果，提取 media_id
    result = requests.get(f"{LOCAL_BRIDGE}/api/v1/tasks/{task_id}/result", timeout=10).json()
    media_id = result.get("mediaId")
    if not media_id:
        print(f"ERROR: No mediaId in result: {result}")
        sys.exit(1)
    return media_id


def main():
    if not os.path.exists(IMAGE_PATH):
        print(f"ERROR: Image file not found: {IMAGE_PATH}")
        print(f"错误：找不到图片文件 {IMAGE_PATH}，请检查路径。")
        sys.exit(1)

    try:
        instance_id = get_instance_id()
    except requests.exceptions.ConnectionError:
        print("ERROR: TweetPilot not running / TweetPilot 未在运行")
        sys.exit(1)

    print(f"Uploading image / 上传图片中: {IMAGE_PATH}")
    media_id = upload_image(IMAGE_PATH, instance_id)
    print(f"Upload done / 上传完成, media_id: {media_id}")

    # EN: Post tweet with the uploaded media_id
    # 中文：带 media_id 发推
    resp = requests.post(f"{LOCAL_BRIDGE}/api/v1/x/tweets", json={
        "text":      TWEET_TEXT,
        "media_ids": [media_id],
    }, timeout=15)
    resp.raise_for_status()
    data   = resp.json()
    errors = data.get("data", {}).get("errors")
    if errors:
        for err in errors:
            print(f"ERROR: Twitter rejected — code {err.get('code')}: {err.get('message')}")
        sys.exit(1)

    try:
        tweet_id = data["data"]["data"]["create_tweet"]["tweet_results"]["result"]["rest_id"]
    except (KeyError, TypeError):
        tweet_id = "unknown"

    print(f"Tweet sent / 发推成功: {TWEET_TEXT}")
    print(f"Tweet ID: {tweet_id}")


if __name__ == "__main__":
    main()
