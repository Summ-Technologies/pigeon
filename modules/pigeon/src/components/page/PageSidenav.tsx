import {
  Avatar,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
} from "@chatscope/chat-ui-kit-react"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import {Box, Drawer, Hidden, makeStyles} from "@material-ui/core"
import {
  AddRounded,
  CreditCardRounded,
  ExitToAppRounded,
  FlightRounded,
  ForumRounded,
  HomeRounded,
  PersonRounded,
} from "@material-ui/icons"
import React, {PropsWithChildren, useState} from "react"
import AppLogo from "../base/AppLogo"
import PageNav from "./PageNav"

let DRAWER_WIDTH = 350
const lillyIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
const patrikIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
const zoeIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
const joeIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
const eliotIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
const akaneIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
const kaiIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
const emilyIco =
  "https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.appBar - 1,
    height: "100%",
    width: DRAWER_WIDTH,
  },
  paper: {width: DRAWER_WIDTH, overflow: "hidden"},
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
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

let sidenavItems = {
  onboarding: ["Onboarding", <HomeRounded />],
  employees: ["Employees", <PersonRounded />],
  flights: ["Flights", <FlightRounded />],
  accomodations: ["Accomodations", <HomeRounded />],
  corpCard: ["Corporate cards", <CreditCardRounded />],
  bestPractices: ["Retreat best practices", <AddRounded />],
  addOns: ["Retreat add ons", <CreditCardRounded />],
}

let sidenavAccountItems = {
  support: ["Support", <ForumRounded />],
  logOut: ["Log out", <ExitToAppRounded />],
}

let items = {...sidenavItems, ...sidenavAccountItems}

type SidenavItemType = keyof typeof items
type PageSidenavProps = {
  activeItem?: SidenavItemType
}
export default function PageSidenav(
  props: PropsWithChildren<PageSidenavProps>
) {
  const classes = useStyles()
  let [open, setOpen] = useState(false)

  function DrawerBody(props: {logoSize?: "small" | "large"}) {
    return (
      <Box
        display="flex"
        height={"100%"}
        width="100%"
        flexDirection="column"
        justifyContent="space-between">
        <Box className={classes.toolbar}>
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
              <Conversation
                name="Lilly"
                lastSenderName="Lilly"
                info="Yes i can do it for you">
                <Avatar src={lillyIco} name="Lilly" status="available" />
              </Conversation>

              <Conversation
                name="Joe"
                lastSenderName="Joe"
                info="Yes i can do it for you">
                <Avatar src={joeIco} name="Joe" status="dnd" />
              </Conversation>
              <Conversation
                name="Joe"
                lastSenderName="Joe"
                info="Yes i can do it for you">
                <Avatar src={joeIco} name="Joe" status="dnd" />
              </Conversation>
              <Conversation
                name="Joe"
                lastSenderName="Joe"
                info="Yes i can do it for you">
                <Avatar src={joeIco} name="Joe" status="dnd" />
              </Conversation>
              <Conversation
                name="Joe"
                lastSenderName="Joe"
                info="Yes i can do it for you">
                <Avatar src={joeIco} name="Joe" status="dnd" />
              </Conversation>
              <Conversation
                name="Joe"
                lastSenderName="Joe"
                info="Yes i can do it for you">
                <Avatar src={joeIco} name="Joe" status="dnd" />
              </Conversation>
              <Conversation
                name="Joe"
                lastSenderName="Joe"
                info="Yes i can do it for you">
                <Avatar src={joeIco} name="Joe" status="dnd" />
              </Conversation>

              <Conversation
                name="Emily"
                lastSenderName="Emily"
                info="Yes i can do it for you"
                unreadCnt={3}>
                <Avatar src={emilyIco} name="Emily" status="available" />
              </Conversation>

              <Conversation
                name="Kai"
                lastSenderName="Kai"
                info="Yes i can do it for you"
                unreadDot>
                <Avatar src={kaiIco} name="Kai" status="unavailable" />
              </Conversation>

              <Conversation
                name="Akane"
                lastSenderName="Akane"
                info="Yes i can do it for you">
                <Avatar src={akaneIco} name="Akane" status="eager" />
              </Conversation>

              <Conversation
                name="Eliot"
                lastSenderName="Eliot"
                info="Yes i can do it for you">
                <Avatar src={eliotIco} name="Eliot" status="away" />
              </Conversation>

              <Conversation
                name="Zoe"
                lastSenderName="Zoe"
                info="Yes i can do it for you">
                <Avatar src={zoeIco} name="Zoe" status="dnd" />
              </Conversation>

              <Conversation
                name="Patrik"
                lastSenderName="Patrik"
                info="Yes i can do it for you">
                <Avatar src={patrikIco} name="Patrik" status="invisible" />
              </Conversation>
            </ConversationList>
          </Sidebar>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Hidden smDown>
        <Drawer
          className={classes.root}
          classes={{paper: classes.paper}}
          variant="permanent">
          <DrawerBody logoSize="large" />
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
          <DrawerBody logoSize="small" />
        </Drawer>
      </Hidden>
    </>
  )
}
