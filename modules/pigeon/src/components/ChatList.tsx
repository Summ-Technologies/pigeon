import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import {Box, makeStyles} from "@material-ui/core"
import React, {PropsWithChildren, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {ConversationModel, UserModel} from "../models/message"
import {RootState} from "../store"
import {getMessages, postMessage} from "../store/actions/message"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
}))

type ChatListProps = {}

export default function ChatList(props: PropsWithChildren<ChatListProps>) {
  const classes = useStyles(props)
  let dispatch = useDispatch()
  let activeConvo = useSelector(
    (state: RootState) => state.message.ui.activeConvo
  )
  let conversations = useSelector(
    (state: RootState) => state.message.conversations
  )
  let messages = useSelector((state: RootState) => state.message.messages)
  let users = useSelector((state: RootState) => state.message.users)
  const [messageInputValue, setMessageInputValue] = useState("")
  let [activeUser, setActiveUser] = useState<UserModel | undefined>(undefined)
  let [activeConversation, setActiveConversation] =
    useState<ConversationModel | undefined>(undefined)
  useEffect(() => {
    if (
      activeConversation &&
      activeConvo &&
      activeConversation.id !== activeConvo
    ) {
      setActiveConversation(conversations[activeConvo])
    } else if (activeConvo === undefined && activeConversation !== undefined) {
      setActiveConversation(undefined)
    } else if (activeConvo) {
      setActiveConversation(conversations[activeConvo])
    }
  }, [activeConvo, setActiveConversation, conversations, activeConversation])
  useEffect(() => {
    if (activeConversation) {
      setActiveUser(users[activeConversation.user_id])
    } else {
      setActiveUser(undefined)
    }
  }, [setActiveUser, activeConversation, users])

  useEffect(() => {
    if (activeConvo) dispatch(getMessages(activeConvo))
  }, [activeConvo, dispatch])

  let [sortedMessages, setSortedMessages] = useState<string[]>([])

  useEffect(() => {
    if (activeConversation) {
      console.log("3")
      let _messages = Object.values(messages).filter((mes) => {
        return (
          mes.conversation_id === (activeConversation as ConversationModel).id
        )
      })
      console.log(_messages)
      _messages.sort((a, b) => (a.ts > b.ts ? 1 : -1))
      setSortedMessages(_messages.map((_mes) => _mes.ts))
    } else {
      console.log("2")
      setSortedMessages([])
    }
  }, [setSortedMessages, messages, activeConversation])

  function ConvoMessage(props: {
    display_name?: string
    time?: string
    message: string
    direction: "incoming" | "outgoing"
  }) {
    return (
      <Message
        model={{
          message: props.message,
          sentTime: props.time,
          sender: props.display_name,
          direction: props.direction,
          position: "single",
        }}
      />
    )
  }

  return (
    <Box className={classes.root}>
      {activeConversation &&
      activeUser &&
      users &&
      conversations &&
      messages ? (
        <ChatContainer>
          <ConversationHeader>
            <Avatar src={activeUser.avatar} name={activeUser.display_name} />
            <ConversationHeader.Content userName={activeUser.display_name} />
          </ConversationHeader>
          <MessageList>
            {sortedMessages.map((mes) => {
              let message = messages[mes]
              return (
                <ConvoMessage
                  display_name={users[message.user_id].display_name}
                  direction="incoming"
                  message={message.text}
                  time={message.ts}
                />
              )
            })}
          </MessageList>
          <MessageInput
            attachButton={false}
            disabled={messageInputValue.length > 0}
            onSend={() => {
              if (activeConvo)
                dispatch(postMessage(messageInputValue, activeConvo))
            }}
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val: string) => setMessageInputValue(val)}
          />
        </ChatContainer>
      ) : undefined}
    </Box>
  )
}
