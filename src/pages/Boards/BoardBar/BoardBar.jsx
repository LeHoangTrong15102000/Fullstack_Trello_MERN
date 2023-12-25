import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

const BoardBar = ({ board }) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.boardBarHeight, // cẩn thẩn Unikey trong lúc code
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          paddingX: 2,
          overflow: 'auto',
          // borderBottom: '1px solid #00bfa5',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title={board?.description}>
            <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label={board?.title} clickable />
          </Tooltip>
          <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable />
          <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label='Add to Google Drive' clickable />
          <Chip sx={MENU_STYLES} icon={<BoltIcon />} label='Automation' clickable />
          <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label='Filter' clickable />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant='outlined'
            startIcon={<PersonAddIcon />}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white'
              }
            }}
          >
            Invite
          </Button>
          <AvatarGroup
            max={7}
            sx={{
              gap: '2px',
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16,
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                '&:first-of-type': {
                  backgroundColor: '#a4b0be'
                }
              }
            }}
          >
            <Tooltip>
              <Avatar
                alt='HoangTrongDev'
                src='https://api-ecom.duthanhduoc.com/images/03c2f2c8-7003-4ac2-9975-8ebe5cf9a5d7.jpg'
              />
            </Tooltip>
            <Tooltip>
              <Avatar
                alt='HoangTrongDev'
                src='https://api-ecom.duthanhduoc.com/images/b258c475-174a-4339-a707-207743634785.jpg'
              />
            </Tooltip>
            <Tooltip>
              <Avatar
                alt='HoangTrongDev'
                src='https://api-ecom.duthanhduoc.com/images/77d9909d-3161-4195-a67c-db4585f80e4b.jpg'
              />
            </Tooltip>
            <Tooltip>
              <Avatar
                alt='HoangTrongDev'
                src='https://api-ecom.duthanhduoc.com/images/30f45769-48ed-4eb4-b4c1-98075bdf1b99.png'
              />
            </Tooltip>
            <Tooltip>
              <Avatar
                alt='HoangTrongDev'
                src='https://api-ecom.duthanhduoc.com/images/2db0883e-5ce3-469f-9476-16b6a436e868.png'
              />
            </Tooltip>
            <Tooltip>
              <Avatar
                alt='HoangTrongDev'
                src='https://api-ecom.duthanhduoc.com/images/efc30186-e630-4362-9302-4b4bf93398bb.png'
              />
            </Tooltip>

            <Tooltip>
              <Avatar
                alt='HoangTrongDev'
                src='https://api-ecom.duthanhduoc.com/images/03c2f2c8-7003-4ac2-9975-8ebe5cf9a5d7.jpg'
              />
            </Tooltip>
            <Tooltip>
              <Avatar
                alt='HoangTrongDev'
                src='https://api-ecom.duthanhduoc.com/images/03c2f2c8-7003-4ac2-9975-8ebe5cf9a5d7.jpg'
              />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </>
  )
}

export default BoardBar
