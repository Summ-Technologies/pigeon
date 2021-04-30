import {createMuiTheme} from "@material-ui/core/styles"

export const theme = createMuiTheme({
  palette: {
    background: {
      default: "#F5F5F5", //grey[100]
    },
    primary: {
      main: "#4456FC",
    },
    success: {
      main: "#57C17A",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    h1: {
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
      fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    },
    h2: {
      fontSize: "2rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
      fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    },
    h3: {
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
      fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    },
    h4: {
      fontSize: "1.15rem",
      lineHeight: 1.3,
      letterSpacing: "0",
      fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    },
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        verticalAlign: "middle",
      },
    },
  },
  mixins: {
    toolbar: {
      // Give the nav bar a defined height so that
      //    the app icon img height can use % value
      height: 60,
      maxHeight: 60,
      "@media (min-width:0px) and (orientation: landscape)": {
        height: 60,
        maxHeight: 60,
      },
      "@media (min-width:600px)": {
        height: 60,
        maxHeight: 60,
      },
    },
  },
})

// Using variables from the theme to set additional values (like fontWeights (based on typography.fontWeightX))
theme.typography.h1.fontWeight = theme.typography.fontWeightRegular
theme.typography.h2.fontWeight = theme.typography.fontWeightMedium
theme.typography.h3.fontWeight = theme.typography.fontWeightMedium
theme.typography.h4.fontWeight = theme.typography.fontWeightBold
