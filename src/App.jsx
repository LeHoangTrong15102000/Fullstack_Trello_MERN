import Button from '@mui/material/Button'
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id='label-select-dark-light-mode'>Mode</InputLabel>
      <Select
        labelId='label-select-dark-light-mode'
        id='select-dark-light-mode'
        value={mode}
        label='Mode'
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon fontSize='small' />
            Light
          </div>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize='small' />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessOutlinedIcon fontSize='small' />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

// Trong khi đó là không là gì một chút là được rồi nó là một cái gì đó rất là ố yeah

// Trong khi 

// Trong khi đó là gì mà chúng ta cần phải thực hiện nhiều hơn nữa

// Viết function toggle theme
// const ModeToggle = () => {
//   const { mode, setMode } = useColorScheme()
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
//   const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')

//   console.log('prefersDarkMode: ', prefersDarkMode)
//   console.log('prefersLightMode: ', prefersLightMode)

//   return (
//     <Button
//       onClick={() => {
//         setMode(mode === 'light' ? 'dark' : 'light')
//       }}
//     >
//       {mode === 'light' ? 'Turn dark' : 'Turn light'}
//     </Button>
//   )
// }

function App() {
  return (
    <Container>
      <ModeSelect />
    </Container>
  )
}

export default App
