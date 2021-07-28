import {Action} from "redux"
import {ConversationModel, MessageModel, UserModel} from "../../models/message"
import {ApiAction, ApiUtils} from "../actions/api"
import {
  GET_CONVOS_SUCCESS,
  GET_MESSAGES_SUCCESS,
  GET_USERS_SUCCESS,
  POST_MESSAGE_REQUEST,
  SET_ACTIVE_CONVO,
} from "../actions/message"
export type MessageState = {
  users: {[key: string]: UserModel}
  messages: {[key: string]: MessageModel}
  conversations: {[key: string]: ConversationModel}
  ui: {
    activeConvo?: string
  }
}
const initialState: MessageState = {
  users: {},
  messages: {},
  conversations: {},
  ui: {},
}

export default function MessageReducer(
  state: MessageState = initialState,
  action: Action
): MessageState {
  var payload
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      payload = (action as ApiAction).payload as {
        messages: MessageModel[]
      }
      return {
        ...state,
        messages: {
          ...state.messages,
          ...ApiUtils.listToDictTs(payload.messages),
        },
      }
    case GET_USERS_SUCCESS:
      payload = (action as ApiAction).payload as {
        users: UserModel[]
      }
      return {
        ...state,
        users: {...state.users, ...ApiUtils.listToDict(payload.users)},
      }
    case GET_CONVOS_SUCCESS:
      payload = (action as ApiAction).payload as {
        conversations: ConversationModel[]
      }
      return {
        ...state,
        conversations: {
          ...state.conversations,
          ...ApiUtils.listToDict(payload.conversations),
        },
      }
    case POST_MESSAGE_REQUEST:
      return state
    case SET_ACTIVE_CONVO:
      let convoId = (action as {type: string; convoId: string}).convoId
      return {...state, ui: {activeConvo: convoId}}
    default:
      return state
  }
}
