import {Action} from "redux"
import {SET_USER_LOGGED_IN, SET_USER_LOGGED_OUT} from "../actions/user"

export type UserState = {
  loginStatus: "UNKNOWN" | "LOGGED_IN" | "LOGGED_OUT"
}

const initialState: UserState = {
  loginStatus: "UNKNOWN",
}

export default function userReducer(
  state: UserState = initialState,
  action: Action
): UserState {
  switch (action.type) {
    case SET_USER_LOGGED_IN:
      return {...state, loginStatus: "LOGGED_IN"}
    case SET_USER_LOGGED_OUT:
      return {...state, loginStatus: "LOGGED_OUT"}
    default:
      return state
  }
}
