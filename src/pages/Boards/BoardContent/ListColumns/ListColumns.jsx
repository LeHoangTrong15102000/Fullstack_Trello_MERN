import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useMemo } from 'react'

const ListColumns = ({ columns }) => {
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
          <Column key={column._id} column={column} />
        ))}

        {/* Box Add new column CTA */}
        <Box
          sx={{
            maxWidth: '200px',
            minWidth: '200px',
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
      </Box>
    </SortableContext>
  )
}

export default ListColumns
