import { useState } from 'react'

import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect/ModeSelect'

// import TrelloLogo from '~/assets/trello.svg'
// import ReactComponent để coi TrelloIcon như một component của React
import Typography from '@mui/material/Typography'
import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Template from './Menu/Template'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import Profile from './Menu/Profile'
import InputAdornment from '@mui/material/InputAdornment'

import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import AppsIcon from '@mui/icons-material/Apps'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

// Thôi thì e hãy về nơi gắm hoa lụa là

const AppBar = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleRemoveTextSearch = () => {
    setSearchValue('')
  }

  return (
    <Box
      // 16px
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflow: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        {/* <img src={TrelloLogo} /> */}
        {/* Sử dụng inheritViewBox để kế thừa lại scale của thằng svg */}
        {/* Để mà sử dụng được thằng này thì cần có thư viện của thằng vite đó là `vite-plugin-svgr` */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'white' }}>
          <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Trello
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Template />
            <Button
              variant='outlined'
              startIcon={<LibraryAddIcon />}
              sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'white' }}>
        <TextField
          id='outlined-search'
          label='Search...'
          type='text'
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <CloseIcon
                  onClick={handleRemoveTextSearch}
                  fontSize='small'
                  sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': {
              color: 'white'
            },
            '& input': {
              color: 'white'
            },
            '& label.Mui-focused': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            }
          }}
        />
        <ModeSelect />

        <Tooltip title='Notifications'>
          <Badge color='warning' variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
