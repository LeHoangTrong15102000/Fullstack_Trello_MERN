// import { createTheme } from '@mui/material/styles'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, orange, teal, deepOrange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secodary: deepOrange
      }
      // components: {
      //   MuiCssBaseline: {
      //     styleOverrides: `
      //       div {
      //         color: gray;
      //       }
      //     `
      //   }
      // }
      // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
  // ...other properties
})

export default theme
