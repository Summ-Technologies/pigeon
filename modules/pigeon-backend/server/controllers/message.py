import logging

from flask import request
from flask_restful import Resource
from pigeon_core.pigeon_managers import PigeonManager
from pigeon_core.pigeon_models import ConversationModel, MessageModel, UserModel
from pigeon_core.slack_client import SlackClient
from slack_sdk.signature import SignatureVerifier
from summ_web import responses
from webargs import fields
from webargs.flaskparser import use_args

from .. import app, db

logger = logging.getLogger(__name__)

pigeon_manager = PigeonManager(db.session, app.config)
slack_client = SlackClient(app.config)


class MessageController(Resource):
    def get(self, conversation_id: str):
        conversation = pigeon_manager.get_conversation(conversation_id)
        if conversation:
            messages = pigeon_manager.get_messages(conversation=conversation)
            return responses.success(
                {"messages": list(map(MessageModel.to_json, messages))}, 200
            )
        else:
            return responses.error("Conversation not found", None, 404)

    post_args = {"message": fields.String(required=True)}

    @use_args(post_args, location="json")
    def post(self, post_args: dict, conversation_id: str):
        if slack_client.send_text_message(
            conversation_id=conversation_id, message=post_args["message"]
        ):
            return responses.success("Success", 204)
        return responses.error("Something went wrong", status_code=500, error_code=None)


class ConversationController(Resource):
    def get(self):
        return {
            "conversations": list(
                map(ConversationModel.to_json, pigeon_manager.get_conversations())
            )
        }


class UserController(Resource):
    def get(self):
        return {
            "users": list(map(UserModel.to_json, pigeon_manager.get_users())),
        }
