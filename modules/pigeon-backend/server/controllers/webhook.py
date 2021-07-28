import logging

from flask import request
from flask_restful import Resource
from pigeon_core.pigeon_managers import PigeonManager
from slack_sdk.signature import SignatureVerifier
from summ_web import responses

from .. import app, db

logger = logging.getLogger(__name__)

pigeon_manager = PigeonManager(db.session, app.config)
signature_verifier = SignatureVerifier(
    signing_secret=app.config["SLACK_SIGNING_SECRET"]
)


class WebhookController(Resource):
    def post(self):
        if not signature_verifier.is_valid(
            body=request.get_data(),
            timestamp=request.headers.get("X-Slack-Request-Timestamp"),
            signature=request.headers.get("X-Slack-Signature"),
        ):
            return responses.error("Invalid request", status_code=403, error_code=None)

        wrapped_event = request.get_json()
        logger.error(wrapped_event)

        challenge = wrapped_event.get("challenge")
        if challenge:
            return responses.success({"challenge": challenge})

        wrapped_event_type = wrapped_event.get("type")
        event = wrapped_event.get("event", {})
        if (
            wrapped_event_type == "event_callback"
            and event.get("type") == "message"
            and event.get("channel_type") == "im"
        ):
            message_subtype = event.get("subtype")
            if message_subtype == None:
                conversation_id = event["channel"]
                user_id = event["user"]
                text = event["text"]
                ts = event["ts"]
                conversation = pigeon_manager.get_conversation(conversation_id)
                user = pigeon_manager.get_user(user_id)
                if not user:
                    user = pigeon_manager.create_user(user_id)
                if not conversation:
                    conversation = pigeon_manager.create_conversation(
                        conversation_id, user_id
                    )
                pigeon_manager.upsert_message(ts, conversation, user_id, text)
                pigeon_manager.commit_changes()
                return responses.success("Ok")
            elif message_subtype == "message_deleted":
                return responses.error(
                    "Can't handle subtype: message_deleted",
                    status_code=422,
                    error_code=None,
                )
            elif message_subtype == "message_changed":
                conversation_id = event["channel"]
                event_message = event["message"]
                user_id = event_message["user"]
                text = event_message["text"]
                ts = event_message["ts"]
                conversation = pigeon_manager.get_conversation(conversation_id)
                user = pigeon_manager.get_user(user_id)
                if not user:
                    user = pigeon_manager.create_user(user_id)
                if not conversation:
                    conversation = pigeon_manager.create_conversation(
                        conversation_id, user_id
                    )
                pigeon_manager.upsert_message(ts, conversation, user_id, text)
                pigeon_manager.commit_changes()
                return responses.success("Ok")
            else:
                return responses.error(
                    "Can't handle subtype", status_code=422, error_code=None
                )
        else:
            return responses.error(
                "Invalid request, unknown code", status_code=422, error_code=None
            )
