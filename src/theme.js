// import { createTheme } from '@mui/material/styles'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { cyan, orange, teal, deepOrange } from '@mui/material/colors'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'

const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    // sẽ tách cái mã màu này ra ngoài các component vì sau này trang web sẽ lớn lên nếu mà viết hết vào trong đây thì nó sẽ rất là rối
    // light: {
    //   palette: {
    //     primary: teal,
    //     secodary: deepOrange
    //   }
    //   // components: {
    //   //   MuiCssBaseline: {
    //   //     styleOverrides: `
    //   //       div {
    //   //         color: gray;
    //   //       }
    //   //     `
    //   //   }
    //   // }
    //   // spacing: (factor) => `${0.25 * factor}rem`
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange
    //   }
    // }
  },
  components: {
    // Đây là cách mà chúng ta custom thằng scrollbar
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // root là cấu trúc dữ liệu của nó mà chúng ta muốn override ghi đè
        root: {
          // Some CSS
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': {
            borderWidth: '1.5px'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        }
      }
    },
    // Chỉ ghi đè các typography của body1 mà thôi, chứ không thì nó sẽ ăn luôn vào các Typography-h1/h...
    MuiTypography: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // cho nó 1 cái function để lấy ra vài giá trị ở params để custom
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // Các vấn đề như này thì lên stackOverflow tìm sẽ nhanh hơn
          // mui remove all blue/red/purple border selected
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.light
          //   }
          // },
          '& fieldset': {
            borderWidth: '0.5px !important'
          },
          '&:hover fieldset': {
            borderWidth: '1.5px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1.5px !important'
          }
        }
      }
    }
  }
  // ...other properties
})

export default theme
