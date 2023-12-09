import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect'

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

import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import AppsIcon from '@mui/icons-material/Apps'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menu/Profile'

// Thôi thì e hãy về nơi gắm hoa lụa là

const AppBar = () => {
  return (
    <Box
      px={2} // 16px
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        {/* <img src={TrelloLogo} /> */}
        {/* Sử dụng inheritViewBox để kế thừa lại scale của thằng svg */}
        {/* Để mà sử dụng được thằng này thì cần có thư viện của thằng vite đó là `vite-plugin-svgr` */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main' }}>
          <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            Trello
          </Typography>

          <Workspaces />
          <Recent />
          <Starred />
          <Template />

          <Button variant='outlined'>Create</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'primary.main' }}>
        <TextField id='outlined-search' label='Search...' type='search' size='small' />
        <ModeSelect />

        <Tooltip title='Notifications'>
          <Badge color='warning' variant='dot' sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>

        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
