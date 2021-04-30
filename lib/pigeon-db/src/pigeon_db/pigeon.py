from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, String
from sqlalchemy.sql.schema import ForeignKey

from . import base


class User(base.Base):
    """User table"""

    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True)
    display_name = Column(String)
    real_name = Column(String)
    avatar = Column(String)

    # im_channel = relationship
    # team_id = foreign_key


class Conversation(base.Base):

    __tablename__ = "conversations"
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    last_updated = Column(DateTime(timezone=True), nullable=False)


class Message(base.Base):
    __tablename__ = "messages"
    ts = Column(String, primary_key=True)
    conversation_id = Column(String, ForeignKey("conversations.id"))
    user_id = Column(String, ForeignKey("users.id"))
    text = Column(String)
