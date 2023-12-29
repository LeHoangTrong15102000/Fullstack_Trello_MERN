import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
// import AppBar from '../../components/AppBar'
import BoardContent from '~/pages/Boards/BoardContent/BoardContent'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/pages/Boards/BoardBar/BoardBar'
import { mockData } from '~/apis/mock-data'
import {
  createNewColumnAPI,
  createNewCardAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnsAPI,
  deleteColumnDetailAPI
} from '~/apis'
import isEmpty from 'lodash/isEmpty'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const Board = () => {
  const [board, setBoard] = useState(null)

  // Sau này sử dụng Redux thì chỉ cần Fetch nó một cái xong rồi cập nhật lại giá trị ở trên store là được

  useEffect(() => {
    const boardId = '658b1924457408f91c6bd442'
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        // Cần xử lý kéo thả vào một column rỗng
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Nếu không phải trường hợp rõng thì chúng ta phải sắp xếp cái `cards`
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      // console.log('full board: ', board)
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
    const columnUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId)

    if (columnUpdate) {
      // column rỗng bản chất đã có placeholdercard
      if (columnUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        // columnUpdate.cards = columnUpdate.cards.filter((card) => !card.FE_PlaceholderCard)
        // columnUpdate.cards.push(createdCard)
        columnUpdate.cards = [createdCard]
        columnUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnUpdate.cards.push(createdCard)
        columnUpdate.cardOrderIds.push(createdCard._id)
      }
    }

    setBoard(newBoard)
  }

  // Gọi API và xử lý Column khi kéo thả xong xuôi
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    // Gọi API cập nhật lại vị trí column
    // Sau khi goi API cập nhật lại rồi thì khi mà F5 lại thì nó vẫn sẽ không bi ảnh hưởng nữa
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  // lấy vào 3 tham số dndOrderedCards, dndOrderedCardIds, columnId(column kéo thả card)
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnUpdate = newBoard.columns.find((column) => column._id === columnId)

    if (columnUpdate) {
      columnUpdate.cards = dndOrderedCards
      columnUpdate.cardOrderIds = dndOrderedCardIds
    }

    setBoard(newBoard)

    // Gọi API update Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Khi di chuyển card sang column khác
   * B1: Cập nhật lại mảng cardOrderIds của Column ban đầu chứa nó (Hiểu bản chất là xóa _id của cái card ra khỏi mảng)
   * B2: Cập nhật lại mảng cardOrderIs của Column tiếp theo (Hiểu bản chất là thêm _id của cái card vào mảng)
   * B3: Cập nhật lại trường columnId mới của cái Card đã kéo
   * => Làm một API support riêng
   */
  const moveCardToDifferentColumns = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((column) => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    // Tạo ra 2 biến danh sách cardOrderIds trước và sau khi kéo
    // Sẽ xử lý cái `placeholderCard` trước khi gọi API cập nhật
    const nextCardOrderIds = dndOrderedColumns.find((column) => column._id === nextColumnId)?.cardOrderIds
    // Rất khó để trong trường hơp này prevCardOrderIds là một giá trị khác - tối thiểu nố sẽ là một cái mảng có 1 phần tử là placeholderCard
    let prevCardOrderIds = dndOrderedColumns.find((column) => column._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    // Gọi API cập nhật lại update column khi kéo card giữa 2 column khác nhau
    moveCardToDifferentColumnsAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds
    })
  }

  // Xử lý xóa một column
  const deleteColumnDetail = async (columnId) => {
    // Cập nhật lại state cho chuẩn dữ liệu
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter((column) => column._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter((_id) => _id !== columnId)
    setBoard(newBoard)

    // Xử lý API xóa column
    deleteColumnDetailAPI(columnId).then((res) => {
      toast.success(res?.deleteResult)
    })
  }

  // Nếu như mà board chưa có thì chúng ta return v   ề loading
  if (!board) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          gap: 2
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
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
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumns={moveCardToDifferentColumns}
        deleteColumnDetail={deleteColumnDetail}
      />
    </Container>
  )
}

export default Board
