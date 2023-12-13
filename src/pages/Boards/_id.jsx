import Container from '@mui/material/Container'
// import AppBar from '../../components/AppBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import { mockData } from '~/apis/mock-data'

const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      {/* Header */}
      <AppBar />

      {/* BoardBar and Content */}
      <BoardBar board={mockData?.board} />

      <BoardContent board={mockData?.board} />
    </Container>
  )
}

export default Board
