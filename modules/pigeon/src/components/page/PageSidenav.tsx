import {
  Avatar,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
} from "@chatscope/chat-ui-kit-react"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import {Box, Drawer, Hidden, makeStyles} from "@material-ui/core"
import React, {PropsWithChildren, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {ConversationModel, UserModel} from "../../models/message"
import {RootState} from "../../store"
import {setActiveConvo} from "../../store/actions/message"
import AppLogo from "../base/AppLogo"
import PageNav from "./PageNav"

let DRAWER_WIDTH = 350

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.appBar - 1,
    height: "100%",
    width: DRAWER_WIDTH,
  },
  paper: {width: DRAWER_WIDTH, overflow: "hidden"},
  listItemRoot: {
    color: theme.palette.text.secondary,
    "&.Mui-selected": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
      backgroundColor: "inherit",
    },
  },
  listItemButton: {},
  listItemDisabled: {
    color: theme.palette.text.disabled,
  },
}))

function DrawerBody(props: {
  logoSize?: "small" | "large"
  conversations: {[key: string]: ConversationModel}
  users: {[key: string]: UserModel}
  setActiveConvo?: (id: string) => void
}) {
  return (
    <Box
      display="flex"
      height={"100%"}
      width="100%"
      flexDirection="column"
      justifyContent="space-between">
      <Box paddingLeft={2} paddingTop={4} paddingBottom={2}>
        <AppLogo
          noBackground
          withText
          height={props.logoSize === "small" ? 35 : 45}
        />
      </Box>
      <Box overflow="auto" flex={1}>
        <Sidebar position="left" scrollable={true}>
          <Search placeholder="Search..." />
          <ConversationList>
            {Object.keys(props.conversations).map((convoId) => {
              let conversation = props.conversations[convoId]
              let user = props.users[conversation.user_id]
              return (
                <Conversation
                  onClick={() =>
                    props.setActiveConvo
                      ? props.setActiveConvo(convoId)
                      : undefined
                  }
                  key={conversation.id}
                  name={user.display_name}>
                  <Avatar src={user.avatar} name={user.display_name} />
                </Conversation>
              )
            })}
          </ConversationList>
        </Sidebar>
      </Box>
    </Box>
  )
}

type PageSidenavProps = {}
export default function PageSidenav(
  props: PropsWithChildren<PageSidenavProps>
) {
  const classes = useStyles()
  let dispatch = useDispatch()
  let conversations = useSelector(
    (state: RootState) => state.message.conversations
  )
  let users = useSelector((state: RootState) => state.message.users)
  let [open, setOpen] = useState(false)
  return (
    <>
      <Hidden smDown>
        <Drawer
          className={classes.root}
          classes={{paper: classes.paper}}
          variant="permanent">
          <DrawerBody
            setActiveConvo={(id: string) => dispatch(setActiveConvo(id))}
            logoSize="large"
            conversations={conversations}
            users={users}
          />
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <PageNav onMenuClick={() => setOpen(true)} />
      </Hidden>

      <Hidden mdUp>
        <Drawer
          className={classes.root}
          classes={{paper: classes.paper}}
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}>
          <DrawerBody
            setActiveConvo={(id: string) => dispatch(setActiveConvo(id))}
            conversations={conversations}
            users={users}
            logoSize="small"
          />
        </Drawer>
      </Hidden>
    </>
  )
}
