from flask_restful import Api

from .controllers import message, webhook


def route(path: str, major: int = 1, minor: int = 0):
    return "/api" + f"/v{major}.{minor}" + path


def add_routes(api: Api):
    api.add_resource(webhook.WebhookController, route("/slack/webhook"))
    api.add_resource(
        message.MessageController,
        route("/conversations/<string:conversation_id>/messages"),
    )
    api.add_resource(
        message.ConversationController,
        route("/conversations"),
    )
    api.add_resource(message.UserController, route("/users"))
