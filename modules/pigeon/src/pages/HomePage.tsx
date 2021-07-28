import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {RouteComponentProps, withRouter} from "react-router-dom"
import ChatList from "../components/ChatList"
import PageBody from "../components/page/PageBody"
import PageSidenav from "../components/page/PageSidenav"
import {getConvos, getUsers} from "../store/actions/message"

type HomePageProps = RouteComponentProps<{}>
function HomePage(props: HomePageProps) {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getConvos())
    // dispatch(getMessages())
  }, [dispatch])
  return (
    <PageBody fullWidth sideNav={<PageSidenav />}>
      <ChatList />
    </PageBody>
  )
}
export default withRouter(HomePage)
