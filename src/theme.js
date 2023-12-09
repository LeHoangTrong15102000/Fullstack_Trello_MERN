// import { createTheme } from '@mui/material/styles'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, orange, teal, deepOrange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
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
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // root là cấu trúc dữ liệu của nó mà chúng ta muốn override ghi đè
        root: {
          // Some CSS
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // cho nó 1 cái function để lấy ra vài giá trị ở params để custom
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // Các vấn đề như này thì lên stackOverflow tìm sẽ nhanh hơn
          // mui remove all blue/red/purple border selected
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            }
          },
          '& fieldset': {
            borderWidth: '1px !important'
          }
        })
      }
    }
  }
  // ...other properties
})

export default theme
