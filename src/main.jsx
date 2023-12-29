import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
// import { ThemeProvider } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import theme from '~/theme'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Cấu hình MUI dialog
import { ConfirmProvider } from 'material-ui-confirm'

const inputGlobalStyles = <GlobalStyles styles={{ div: { color: 'red' } }} />

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        allowClose: false, // chỉ cho phép tắt  dialog khi nhắn vào cancel button
        dialogProps: { maxWidth: 'xs' },
        buttonOrder: ['confirm', 'cancel'],
        confirmationButtonProps: { color: 'secondary', variant: 'outlined', autoFocus: true },
        cancellationButtonProps: { color: 'warning', variant: 'outlined' }
      }}
    >
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      {/* Và thằng scrollbar nằm trong cssBaseline nên là chúng ta sẽ custom nó trong theme luôn */}
      <CssBaseline />
      {/* {inputGlobalStyles} */}
      <App />
      <ToastContainer autoClose={1000} />
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
)
