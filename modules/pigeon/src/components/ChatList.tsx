import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  EllipsisButton,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  TypingIndicator,
  VideoCallButton,
  VoiceCallButton,
} from "@chatscope/chat-ui-kit-react"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import {Box, makeStyles} from "@material-ui/core"
import React, {PropsWithChildren, useState} from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
}))

type ChatListProps = {}

export default function ChatList(props: PropsWithChildren<ChatListProps>) {
  const classes = useStyles(props)
  const [messageInputValue, setMessageInputValue] = useState("")
  const zoeIco =
    "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"

  return (
    <Box className={classes.root}>
      {/* <MainContainer responsive> */}
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar src={zoeIco} name="Zoe" />
          <ConversationHeader.Content
            userName="Zoe"
            info="Active 10 mins ago"
          />
          <ConversationHeader.Actions>
            <VoiceCallButton />
            <VideoCallButton />
            <EllipsisButton orientation="vertical" />
          </ConversationHeader.Actions>
        </ConversationHeader>
        <MessageList
          typingIndicator={<TypingIndicator content="Zoe is typing" />}>
          <MessageSeparator content="Saturday, 30 November 2019" />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "single",
            }}>
            <Avatar src={zoeIco} name="Zoe" />
          </Message>
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "single",
            }}
            avatarSpacer
          />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "first",
            }}
            avatarSpacer
          />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "normal",
            }}
            avatarSpacer
          />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "normal",
            }}
            avatarSpacer
          />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "last",
            }}>
            <Avatar src={zoeIco} name="Zoe" />
          </Message>
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "first",
            }}
          />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "normal",
            }}
          />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "normal",
            }}
          />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Patrik",
              direction: "outgoing",
              position: "last",
            }}
          />

          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "first",
            }}
            avatarSpacer
          />
          <Message
            model={{
              message: "Hello my friend",
              sentTime: "15 mins ago",
              sender: "Zoe",
              direction: "incoming",
              position: "last",
            }}>
            <Avatar src={zoeIco} name="Zoe" />
          </Message>
        </MessageList>
        <MessageInput
          placeholder="Type message here"
          value={messageInputValue}
          onChange={(val: string) => setMessageInputValue(val)}
        />
      </ChatContainer>
      {/* </MainContainer> */}
    </Box>
  )
}
