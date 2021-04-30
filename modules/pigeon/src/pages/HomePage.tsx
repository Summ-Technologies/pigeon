import {RouteComponentProps, withRouter} from "react-router-dom"
import ChatList from "../components/ChatList"
import PageBody from "../components/page/PageBody"
import PageSidenav from "../components/page/PageSidenav"

type HomePageProps = RouteComponentProps<{}>
function HomePage(props: HomePageProps) {
  return (
    <PageBody fullWidth sideNav={<PageSidenav />}>
      <ChatList />
    </PageBody>
  )
}
export default withRouter(HomePage)
