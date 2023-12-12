import Box from '@mui/material/Box'
import Card from './Card/Card'

// Chiều cao của HEADER và FOOTER sẽ fix cứng
// const COLUMN_HEADER_HEIGHT = '50px'
// const COLUMN_FOOTER_HEIGHT = '56px'

const ListCards = () => {
  return (
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
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)}  - ${theme.trello.columnHeaderHeight} - ${
            theme.trello.columnFooterHeight
          })`,

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
      <Card />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
    </Box>
  )
}

export default ListCards
