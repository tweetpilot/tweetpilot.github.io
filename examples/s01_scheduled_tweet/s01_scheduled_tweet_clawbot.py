"""
S01 · Scheduled Tweet — ClawBot SDK
=====================================
EN: Post a tweet via the TweetClaw browser extension.
    Add this script to TweetPilot's Task Manager for recurring scheduled posting.
中文：通过 TweetClaw 浏览器扩展发推。
     在 TweetPilot 任务管理器中添加本脚本，即可实现定时自动发推。

Requirements / 依赖:
  - TweetClaw extension connected to TweetPilot
  - TweetPilot running (PYTHONPATH auto-injected by scheduler)
  - Manual run: PYTHONPATH="$HOME/.tweetpilot/clawbot" python3 clawbot.py
"""

from datetime import datetime
from clawbot import ClawBotClient

# ── Config / 配置 ────────────────────────────────────────────────────
# EN: Edit TWEET_TEXT. Use {date} to insert today's date automatically.
# 中文：修改 TWEET_TEXT。{date} 会被替换为当天日期（YYYY-MM-DD 格式）。
TWEET_TEXT = "Daily update {date} — powered by TweetPilot"


def main():
    client = ClawBotClient()

    # EN: Auto-select the first connected TweetClaw instance.
    #     For multi-account use, ask TweetPilot AI for guidance.
    # 中文：自动选择第一个已连接的 TweetClaw 实例。
    #      如需多账号操作，请向 TweetPilot AI 询问。
    instances = client.x.status.get_instances()
    instance_id = None
    if isinstance(instances, list) and instances:
        first = instances[0]
        instance_id = first.get("instanceId") or first.get("id")

    text = TWEET_TEXT.format(date=datetime.now().strftime("%Y-%m-%d"))

    # EN: create_tweet sends the tweet through TweetClaw.
    # 中文：create_tweet 通过 TweetClaw 扩展发送推文。
    result = client.x.actions.create_tweet(text, instance_id=instance_id)

    print(f"Tweet sent / 发推成功: {text}")
    print(f"Result: {result}")


if __name__ == "__main__":
    main()
