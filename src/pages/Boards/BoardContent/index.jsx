import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

// Chiều cao của HEADER và FOOTER sẽ fix cứng
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

// Còn chiều cao của LIST CARD sẽ linh hoạt để nó đáp ứng được với chiều cao

const BoardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    //  thằng Box trên mục đích là để hồi padding thôi để cho nó hiện thành scroll đẹp hơn
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        // Trick CSS scroll-bar cho dự án trello
        p: '10px 0'
      }}
    >
      {/* Column */}
      {/* Xử lý CSS scroll cho từng column, do ban đầu không có overflow: 'unset' nên nó không hiện thanh scroll */}
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            // Lấy chiều cao của cả column (boardContentHeight - spacing(5))
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/* Column Header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h6' sx={{ fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Column Title
            </Typography>
            {/* Dropdown menu */}
            <Box>
              {/* <Button
              id='basic-button-workspaces'
              aria-controls={open ? 'basic-menu-workspaces' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<ExpandMoreIcon />}
            >
              Workspaces
            </Button> */}
              <Tooltip title='More options'>
                <ExpandMoreIcon
                  id='basic-column-dropdown'
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                />
              </Tooltip>
              <Menu
                id='basic-menu-column-dropdown'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List Card xử lý cả phần scroll nên là rất là hay */}
          <Box
            sx={{
              // Trick lỏ để xử lý thanh scroll-bar đẹp khi show và khi hidden
              // Trick hay để CSS thanh scroll-bar
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              // không muốn có thanh scroll ngang
              overflowX: 'hidden',
              // khi nào vượt quá chiều cao thì mới hiện thanh scroll dọc
              overflowY: 'auto',
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                  5
                )}  - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,

              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',
                borderRadius: '8px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            {/* Card sẽ custom theo phong cách trello của chúng ta */}
            {/* Khi mà card nhiều thì nó sẽ xuất hiện thanh scroll, nên thằng cha ở ngoài chúng ta cho nó p: '0 5px', m: '0 5px' là như vậy */}
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              <CardMedia
                sx={{ height: 140 }}
                image='https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev-scaled.jpg'
                title='green iguana'
              />
              {/* Thằng CardContent mặc định nó có giá trị overflowY: 'hidden' */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>MERN Stack nâng cao</Typography>
                {/* <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography> */}
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size='small' startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size='small' startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size='small' startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Column Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        {/* Column 2 */}
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            // Lấy chiều cao của cả column (boardContentHeight - spacing(5))
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/* Column Header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h6' sx={{ fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Column Title
            </Typography>
            {/* Dropdown menu */}
            <Box>
              {/* <Button
              id='basic-button-workspaces'
              aria-controls={open ? 'basic-menu-workspaces' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<ExpandMoreIcon />}
            >
              Workspaces
            </Button> */}
              <Tooltip title='More options'>
                <ExpandMoreIcon
                  id='basic-column-dropdown'
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                />
              </Tooltip>
              <Menu
                id='basic-menu-column-dropdown'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List Card xử lý cả phần scroll nên là rất là hay */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              // không muốn có thanh scroll ngang
              overflowX: 'hidden',
              // khi nào vượt quá chiều cao thì mới hiện thanh scroll dọc
              overflowY: 'auto',
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                  5
                )}  - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,

              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',
                borderRadius: '8px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            {/* Card sẽ custom theo phong cách trello của chúng ta */}
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              <CardMedia
                sx={{ height: 140 }}
                image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
                title='green iguana'
              />
              {/* Thằng CardContent mặc định nó có giá trị overflowY: 'hidden' */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>MERN Stack nâng cao</Typography>
                {/* <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography> */}
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size='small' startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size='small' startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size='small' startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Column Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        {/* Column 3 */}
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            ml: 2,
            borderRadius: '6px',
            height: 'fit-content',
            // Lấy chiều cao của cả column (boardContentHeight - spacing(5))
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/* Column Header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='h6' sx={{ fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Column Title
            </Typography>
            {/* Dropdown menu */}
            <Box>
              {/* <Button
              id='basic-button-workspaces'
              aria-controls={open ? 'basic-menu-workspaces' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<ExpandMoreIcon />}
            >
              Workspaces
            </Button> */}
              <Tooltip title='More options'>
                <ExpandMoreIcon
                  id='basic-column-dropdown'
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: 'primary.main', cursor: 'pointer' }}
                />
              </Tooltip>
              <Menu
                id='basic-menu-column-dropdown'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* List Card xử lý cả phần scroll nên là rất là hay */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              // không muốn có thanh scroll ngang
              overflowX: 'hidden',
              // khi nào vượt quá chiều cao thì mới hiện thanh scroll dọc
              overflowY: 'auto',
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                  5
                )}  - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,

              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',
                borderRadius: '8px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            {/* Card sẽ custom theo phong cách trello của chúng ta */}
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              <CardMedia
                sx={{ height: 140 }}
                image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/banner_4boTA4Ee26zYjHtZF-original.jpg'
                title='green iguana'
              />
              {/* Thằng CardContent mặc định nó có giá trị overflowY: 'hidden' */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>MERN Stack nâng cao</Typography>
                {/* <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography> */}
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size='small' startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size='small' startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size='small' startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,.2)', overflow: 'unset' }}>
              {/* <CardMedia
              sx={{ height: 140 }}
              image='https://cdn-proxy.hoolacdn.com/duthanhduoc-44305-1gelkeh9j/sgp1/lib/image/smallthumb_d2uDHZem59Wwf2iRk-original.png'
              title='green iguana'
            /> */}
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>ReactJS nâng cao</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Column Footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
