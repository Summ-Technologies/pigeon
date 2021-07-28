from datetime import datetime

from pigeon_db.pigeon import Conversation, Message, User


class UserModel:
    @staticmethod
    def to_json(user: User):
        return {
            "id": user.id,
            "avatar": user.avatar,
            "email": user.email,
            "display_name": user.display_name,
            "real_name": user.real_name,
        }


class MessageModel:
    @staticmethod
    def to_json(message: Message):
        return {
            "ts": message.ts,
            "user_id": message.user_id,
            "conversation_id": message.conversation_id,
            "text": message.text,
        }


class ConversationModel:
    @staticmethod
    def to_json(conversation: Conversation):
        return {
            "id": conversation.id,
            "last_updated": conversation.last_updated.timestamp(),
            "user_id": conversation.user_id,
        }
