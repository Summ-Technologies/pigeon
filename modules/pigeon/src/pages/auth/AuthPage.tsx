import {Box, Grid, Hidden} from "@material-ui/core"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {RouteComponentProps, withRouter} from "react-router-dom"
import AuthCard, {SigninForm, SignupForm} from "../../components/auth/AuthCard"
import AppImage from "../../components/base/AppImage"
import PageBody from "../../components/page/PageBody"
import {AppRoutes} from "../../Stack"
import {postUserSignin, postUserSignup} from "../../store/actions/user"
import {FormUtils} from "../../utils/formUtils"

type AuthPageProps = RouteComponentProps<{}>
function AuthPage(props: AuthPageProps) {
  let dispatch = useDispatch()

  const authType =
    props.location.pathname.toLowerCase() ===
    AppRoutes.getPath("SignupPage").toLowerCase()
      ? "signup"
      : "signin"

  let [signinForm, setSigninForm] = useState<SigninForm>({
    email: {
      type: "text",
      value: "",
      validator: FormUtils.validateEmail,
    },
    password: {
      type: "text",
      value: "",
      validator: FormUtils.passwordValidator(authType),
    },
  })

  let [signupForm, setSignupForm] = useState<SignupForm>({
    email: {
      type: "text",
      value: "",
      validator: FormUtils.validateEmail,
    },
    password: {
      type: "text",
      value: "",
      validator: FormUtils.passwordValidator(authType),
    },
    firstName: {
      type: "text",
      value: "",
      validator: (val: string) =>
        !val || val.length < 2 ? "Enter your first name" : undefined,
    },
    lastName: {
      type: "text",
      value: "",
      validator: (val: string) =>
        !val || val.length < 2 ? "Enter your last name" : undefined,
    },
  })

  function submitAuthForm() {
    switch (authType) {
      case "signin":
        dispatch(
          postUserSignin(signinForm.email.value, signinForm.password.value)
        )
        break
      case "signup":
        dispatch(
          postUserSignup(
            signupForm.email.value,
            signupForm.password.value,
            signupForm.firstName.value,
            signupForm.lastName.value
          )
        )
        break
    }
  }
  return (
    <PageBody fullWidth>
      <Grid
        container
        style={{height: "100%"}}
        alignItems="center"
        justify="center">
        <Hidden xsDown>
          <Grid
            container
            item
            sm={4}
            md={6}
            justify="center"
            style={{height: "100%"}}>
            <AppImage
              img="https://flok-b32d43c.s3.amazonaws.com/misc/auth-test-img.png"
              alt="img"
            />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8} md={6} style={{alignSelf: "flex-start"}}>
          <Box paddingTop={12}>
            <AuthCard
              authType={authType}
              signinForm={signinForm}
              setSigninForm={setSigninForm}
              signupForm={signupForm}
              setSignupForm={setSignupForm}
              submitAuthForm={submitAuthForm}
            />
          </Box>
        </Grid>
      </Grid>
    </PageBody>
  )
}
export default withRouter(AuthPage)
