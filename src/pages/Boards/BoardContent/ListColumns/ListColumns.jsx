import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'

const ListColumns = () => {
  return (
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
      <Column />
      <Column />
      <Column />

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
  )
}

export default ListColumns
