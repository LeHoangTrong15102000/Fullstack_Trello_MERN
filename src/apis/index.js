import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

/** Boards */
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

// Cập nhật lại mảng Columns ở bên trong thằng board
export const updateBoardDetailsAPI = async (boardId, updateDataBoard) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateDataBoard)
  return response.data
}

// API cập nhật card giữa 2 column khác nhau
export const moveCardToDifferentColumnsAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
  return response.data
}

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

// API cập nhật card trong column
export const updateColumnDetailsAPI = async (columnId, updateDataColumn) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateDataColumn)
  return response.data
}

/** Cards */
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
