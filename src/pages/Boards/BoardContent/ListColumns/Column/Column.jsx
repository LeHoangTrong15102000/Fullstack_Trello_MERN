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
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'

import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useConfirm } from 'material-ui-confirm'

import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

// Chiều cao của HEADER và FOOTER sẽ fix cứng
// const COLUMN_HEADER_HEIGHT = '50px'
// const COLUMN_FOOTER_HEIGHT = '56px'

const Column = ({ column, createNewCard, deleteColumnDetail }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id, // Dữ liệu của thư viện nó hiểu là `id` nên là phải dùng `id`
    data: { ...column }
  })

  const dndKitColumnStyles = {
    touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    // Thay vì là Transform thì chúng ta  sẽ để là Translate
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao sẽ luôn max 100% vì nếu không sẽ bị lỗi lúc kéo column qua một cái column dài thì phải kéo ở giữa rất khó chịu. Lưu ý lúc này phải kết hợp với {...listeners} nằm ở Box chứ không phải ở div ngoài cùng để tránh trường hợp kéo vào vùng xanh
    height: '100%', // Cứ fix cái chiều cao ở đây để hồi làm phần giữ chỗ (DragOverlay) cho nó chuẩn
    opacity: isDragging ? 0.5 : undefined
  }

  // console.log('Value Column: ', column)

  // Do ở đây có sắp xếp card bằng mảng `cardOrderIds` nên trả về dữ liệu không chuẩn thì nó sẽ bị lỗi
  // Sắp xếp các card trong column

  // Thì khi xuống tới đây thì thằng mảng `cards` nó mới được sắp và hiện ra UI
  const orderedCards = column.cards

  // Dropdown menu
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  const confirm = useConfirm()

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
    setNewCardTitle('')
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error("Please enter Card's title!")
      return
    }

    createNewCard({ title: newCardTitle, columnId: column._id })

    toast.success('Add new Card successfully!')
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  const handleDeleteColumn = () => {
    confirm({
      title: 'Delete Column?',
      description: 'This action will permanently delete your Column and its Cards! Are you sure?',
      // Khi dialog mở lên thì nó sẽ focus vào button, nhấn enter sẽ trigger sự kiện click
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'

      // allowClose: false, // chỉ cho phép tắt  dialog khi nhắn vào cancel button
      // dialogProps: { maxWidth: 'xs' },
      // confirmationButtonProps: { color: 'secondary', variant: 'outlined', autoFocus: true },
      // cancellationButtonProps: { color: 'warning', variant: 'outlined' },

      // description: `Phải nhập chữ 'hoangtrongdev' thì mới được confirm!`,
      // confirmationKeyword: 'hoangtrongdev'
      // buttonOrder: ['confirm', 'cancel']
    })
      .then(() => {
        // Gọi API xử lý việc xoá vào trong đây
        deleteColumnDetail(column._id)
      })
      .catch(() => {})
  }

  return (
    // Sẽ bọc nó vào trong một cái div, mặc định cái div ngoài nó sẽ ăn chiều cao là 100%(phải bọc thẻ div vì vấn đề chiều cao khi kéo thả)
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners} // Phần lắng nghe các event -> Để chỉ kéo thả được trong đây thôi -> Không gian kéo thả chịu trong cáii box này thôi
        // sx props
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
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='h6' sx={{ fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            {column?.title}
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
              // bản chất là khi click vào bất kì chỗ nào của icon thì nó cũng đóng lại
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    // Phải có khoảng trống & và .delete-forever-icon chứ không nó sẽ hiểu cái className này làl của menuItem
                    '& .add-card-icon': {
                      color: 'success.light'
                    }
                  }
                }}
                onClick={toggleOpenNewCardForm}
              >
                <ListItemIcon>
                  <AddCardIcon className='add-card-icon' fontSize='small' />
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
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    // Phải có khoảng trống & và .delete-forever-icon chứ không nó sẽ hiểu cái className này làl của menuItem
                    '& .delete-forever-icon': {
                      color: 'warning.dark'
                    }
                  }
                }}
                onClick={handleDeleteColumn}
              >
                <ListItemIcon>
                  <DeleteForeverIcon className='delete-forever-icon' fontSize='small' />
                </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
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
        <ListCards cards={orderedCards} />

        {/* Column Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2
          }}
        >
          {!openNewCardForm ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
              <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                data-no-dnd='true'
                label='Enter Card title...'
                type='text'
                size='small'
                variant='outlined'
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label': {
                    color: 'text.primary'
                  },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: 'fit-content' }}>
                <Button
                  data-no-dnd='true'
                  onClick={addNewCard}
                  variant='contained'
                  color='success'
                  size='small'
                  sx={{
                    boxShadow: 'none',
                    // border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.success.main
                    }
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  onClick={toggleOpenNewCardForm}
                  fontSize='small'
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer'
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
