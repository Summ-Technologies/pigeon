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
    def post(self, get_args):
        if not signature_verifier.is_valid(
            body=request.get_data(),
            timestamp=request.headers.get("X-Slack-Request-Timestamp"),
            signature=request.headers.get("X-Slack-Signature"),
        ):
            return responses.error("Invalid request", status_code=403, error_code=None)

        wrapped_event = request.get_json()

        challenge = wrapped_event.get("challenge")
        if challenge:
            return responses.success({"challenge": challenge})

        event = wrapped_event.get("event", {})
        event_type = event.get("type")
        event_subtype = event.get("subtype")
        if event_type == "message" and event_subtype == "im":
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
            message = pigeon_manager.upsert_message(ts, conversation, user_id, text)
            pigeon_manager.commit_changes()
            return responses.success("Ok")
        else:
            responses.error(
                "Invalid request, unknown code", status_code=422, error_code=None
            )
