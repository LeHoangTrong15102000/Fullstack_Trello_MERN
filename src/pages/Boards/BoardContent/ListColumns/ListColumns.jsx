import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

const ListColumns = ({ columns, createNewColumn, createNewCard, deleteColumnDetail }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const toggleOpenNewColumnForm = async () => {
    setOpenNewColumnForm(!openNewColumnForm)
    setNewColumnTitle('')
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error("Please enter column's title!")
      return
    }

    createNewColumn({
      title: newColumnTitle
    })

    toast.success('Add new column successfully!')
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  /**
   *Thằng SortableContext yêu cầu items là một mảng dạng [`id-1`, `id-2`] chứ không phải [{id: `id-1`}, {id: `id-2`}]
   Nếu không đúng vẫn kéo thả được nhưng mà không có animation
   */

  // Khi nào thêm column mới thì columnIds sẽ render lại
  const columnIds = useMemo(() => columns.map((column) => column._id), [columns])
  return (
    <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
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
        {/* Column */}
        {/* Xử lý CSS scroll cho từng column, do ban đầu không có overflow: 'unset' nên nó không hiện thanh scroll */}
        {columns?.map((column) => (
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetail={deleteColumnDetail}
          />
        ))}

        {/* Box Add new column CTA */}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              maxWidth: '250px',
              minWidth: '250px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              backgroundColor: '#ffffff3d'
            }}
          >
            {/* Mặc định thằng button của MUI là display: flex rồi  */}
            <Button
              sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
              startIcon={<CreateNewFolderIcon />}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              backgroundColor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label='Enter column title...'
              type='text'
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
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
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: 'fit-content' }}>
              <Button
                onClick={addNewColumn}
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
                Add column
              </Button>
              <CloseIcon
                onClick={toggleOpenNewColumnForm}
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    color: (theme) => theme.palette.warning.light
                  }
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
