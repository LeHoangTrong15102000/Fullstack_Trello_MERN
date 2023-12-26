import Button from '@mui/material/Button'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'

import Board from '~/pages/Boards/_id'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Trong khi đó là gì mà chúng ta cần phải thực hiện nhiều hơn nữa

function App() {
  return (
    <>
      {/* React Router Dom /Boards /Boards/{Board_id} */}

      {/* Board Detail */}
      <Board />
      <ToastContainer autoClose={1500} />
    </>
  )
}

export default App
