import logging
from typing import Optional

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

logger = logging.getLogger(__name__)


class SlackClient(object):
    def __init__(self, config: dict):
        assert (
            config.get("SLACK_BOT_TOKEN") is not None
        ), "SLACK_BOT_TOKEN required config"
        self.config = config
        self.client = WebClient(config["SLACK_BOT_TOKEN"])

    def open_conversation(self, user: str) -> Optional[str]:
        try:
            response = self.client.conversations_open(users=user)
            channel = response.data.get("channel", {}).get("id")
            if channel:
                return channel
        except SlackApiError as e:
            logger.error("Exception in open_conversation", exc_info=e)
        return None

    def send_text_message(self, channel: str, message: str):
        try:
            self.client.chat_postMessage(channel=channel, text=message)
            return True
        except SlackApiError as e:
            logger.error("Exception in send_text_message", exc_info=e)
        return False
