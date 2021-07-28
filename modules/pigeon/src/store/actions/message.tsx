import {createApiAction} from "./api"

export const SET_ACTIVE_CONVO = "SET_ACTIVE_CONVO"

export function setActiveConvo(convoId?: string) {
  return {
    type: SET_ACTIVE_CONVO,
    convoId,
  }
}

export const GET_MESSAGES_REQUEST = "GET_MESSAGES_REQUEST"
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS"
export const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE"

export function getMessages(convoId: string) {
  let endpoint = `/v1.0/conversations/${convoId}/messages`
  return createApiAction({
    method: "GET",
    endpoint,
    types: [GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE],
  })
}

export const POST_MESSAGE_REQUEST = "POST_MESSAGE_REQUEST"
export const POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS"
export const POST_MESSAGE_FAILURE = "POST_MESSAGE_FAILURE"

export function postMessage(message: string, convoId: string) {
  let endpoint = `/v1.0/conversations/${convoId}/messages`
  return createApiAction({
    method: "POST",
    body: JSON.stringify({message}),
    endpoint,
    types: [POST_MESSAGE_REQUEST, POST_MESSAGE_SUCCESS, POST_MESSAGE_FAILURE],
  })
}

export const GET_CONVOS_REQUEST = "GET_CONVOS_REQUEST"
export const GET_CONVOS_SUCCESS = "GET_CONVOS_SUCCESS"
export const GET_CONVOS_FAILURE = "GET_CONVOS_FAILURE"
export function getConvos() {
  let endpoint = "/v1.0/conversations"
  return createApiAction({
    method: "GET",
    endpoint,
    types: [GET_CONVOS_REQUEST, GET_CONVOS_SUCCESS, GET_CONVOS_FAILURE],
  })
}

export const GET_USERS_REQUEST = "GET_USERS_REQUEST"
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"
export const GET_USERS_FAILURE = "GET_USERS_FAILURE"
export function getUsers() {
  let endpoint = "/v1.0/users"
  return createApiAction({
    method: "GET",
    endpoint,
    types: [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE],
  })
}
