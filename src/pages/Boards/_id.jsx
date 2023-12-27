import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
// import AppBar from '../../components/AppBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import { mockData } from '~/apis/mock-data'
import { createNewColumnAPI, createNewCardAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis'
import isEmpty from 'lodash/isEmpty'
import { generatePlaceholderCard } from '~/utils/formatters'

const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '658b1924457408f91c6bd442'
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Cần xử lý kéo thả vào một column rỗng
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })

      setBoard(board)
    })
  }, [])

  // Gọi Api create Column và làm lại dữ liệu board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({ ...newColumnData, boardId: board._id })

    // Khi tạo column mới thì chưa có card, cần xử lý thả card vào column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({ ...newCardData, boardId: board._id })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }

    setBoard(newBoard)
  }

  // Gọi API và xử lý Column khi kéo thả xong xuôi
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API cập nhật lại vị trí column
    // Sau khi goi API cập nhật lại rồi thì khi mà F5 lại thì nó vẫn sẽ không bi ảnh hưởng nữa
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      {/* Header */}
      <AppBar />
      {/* BoardBar and Content */}
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board
