import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Api getDetails Board
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const fetchCreateColumnAPI = async () => {}

export const fetchCreateCardAPI = async () => {}
