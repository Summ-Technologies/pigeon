import logging
from datetime import datetime, timezone
from typing import List, Optional

from pigeon_core.slack_client import SlackClient
from pigeon_db.pigeon import Conversation, Message, User

from .base_manager import BaseManager

logger = logging.getLogger(__name__)


class PigeonManager(BaseManager):
    def validate_config(self, config: dict):
        """
        Required config values:
        """

    def get_user(self, user_id: str) -> Optional[User]:
        return self.session.query(User).get(user_id)

    def get_users(self) -> List[User]:
        return self.session.query(User).all()

    def create_user(
        self,
        id: str,
        email: str = None,
        display_name: str = None,
        real_name: Optional[str] = None,
        avatar: str = None,
    ) -> User:
        new_user = User()
        new_user.id = id
        new_user.email = email
        new_user.display_name = display_name
        new_user.real_name = real_name
        new_user.avatar = avatar
        self.session.add(new_user)
        self.session.flush()
        return new_user

    def upsert_message(
        self,
        ts: str,
        conversation: Conversation,
        user_id: str,
        text: str,
    ) -> Optional[Message]:
        message = None
        try:
            message = Message()
            message.ts = ts
            message.conversation_id = conversation.id
            message.user_id = user_id
            message.text = text
            self.session.add(message)
            self.session.flush()
        except:
            message = self.session.query(Message).get(ts)
            if message and message.text != text:
                message.text = text
                self.session.add(message)
                self.session.flush()
        if message:
            conversation.last_updated = datetime.now(tz=timezone.utc)
            self.session.add(conversation)
            self.session.flush()
        return message

    def get_messages(self, conversation: Conversation, page: int = 0):
        page_size = 30
        return (
            self.session.query(Message)
            .filter(Message.conversation_id == conversation.id)
            .order_by(Message.ts.desc())
            .limit(page_size)
            .offset(page_size * page)
            .all()
        )

    def get_conversation(self, conversation_id: str) -> Optional[Conversation]:
        return self.session.query(Conversation).get(conversation_id)

    def get_conversations(self) -> List[Conversation]:
        return self.session.query(Conversation).all()

    def create_conversation(self, id: str, user_id: str):
        new_conversation = Conversation()
        new_conversation.id = id
        new_conversation.user_id = user_id
        new_conversation.last_updated = datetime.now(tz=timezone.utc)
        self.session.add(new_conversation)
        self.session.flush()
        return new_conversation
