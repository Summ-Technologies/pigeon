export type UserModel = {
  id: string
  avatar?: string
  email?: string
  display_name?: string
  real_name?: string
}
export type ConversationModel = {
  id: string
  last_updated: number
  user_id: string
}
export type MessageModel = {
  ts: string
  user_id: string
  conversation_id: string
  text: string
}
