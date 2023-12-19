import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
// import { ThemeProvider } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import theme from '~/theme'
import GlobalStyles from '@mui/material/GlobalStyles'

const inputGlobalStyles = <GlobalStyles styles={{ div: { color: 'red' } }} />

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    {/* Và thằng scrollbar nằm trong cssBaseline nên là chúng ta sẽ custom nó trong theme luôn */}
    <CssBaseline />
    {/* {inputGlobalStyles} */}
    <App />
  </CssVarsProvider>
  // </React.StrictMode>
)
