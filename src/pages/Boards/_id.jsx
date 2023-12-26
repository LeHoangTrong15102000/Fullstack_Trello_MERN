import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
// import AppBar from '../../components/AppBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import { mockData } from '~/apis/mock-data'
import { createNewColumnAPI, createNewCardAPI, fetchBoardDetailsAPI } from '~/apis'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '658ac0cde0242e94bbee1e31'
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  // Gọi Api create Column và làm lại dữ liệu board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({ ...newColumnData, boardId: board._id })
    // setBoard(createdColumn)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({ ...newCardData, boardId: board._id })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      {/* Header */}
      <AppBar />
      {/* BoardBar and Content */}
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
    </Container>
  )
}

export default Board
