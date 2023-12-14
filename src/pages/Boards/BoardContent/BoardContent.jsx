import { useEffect, useState } from 'react'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import Box from '@mui/material/Box'
import { arrayMove } from '@dnd-kit/sortable'

import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

// Còn chiều cao của LIST CARD sẽ linh hoạt để nó đáp ứng được với chiều cao

// Tổ chức lại cấu trúc code một cách khoa học Board - Columns - Cards cho nó hợp lí để dễ dàng mantaince sau này

const BoardContent = ({ board }) => {
  // Nếu sử dụng PointerSensor mặc định thì phải kết hợp thuộc tính CSS touch-action: none ở những phàn tử kéo thả
  const pointerSensor = useSensor(PointerSensor, {
    // Nó phải di chuyển 10px trước khi nó được active
    activationConstraint: {
      distance: 10
    }
  })

  // Yêu cầu phải 10px thì mới được active y chang pointerSensor
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Nhấn giữ 250ms và dung sai của cảm ứng (dễ hiểu là di chuyển/chênh lệch 5px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  //  Sắp xếp mảng column dựa trên mảng khác , sau này sẽ sắp xếp dựa trên mảng columnOrderIds từ BE trả về
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Sẽ nhận được giá trị từ thư viện kéo thả của chúng ta -> event
  const handleDragEnd = (event) => {
    console.log('handleDragEnd', event)
    const { active, over } = event

    // Nếu over là null thì code sẽ không chạy nữa(kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return

    // Khi mà vị trí nó có thay đổi thì mới xử lý tiếp
    if (active.id !== over.id) {
      // lấy vị trí cũ (từ thằng active)
      const oldIndex = orderedColumns.findIndex((column) => column._id === active.id)

      // Lấy vị trí mới (từ thằng over)
      const newIndex = orderedColumns.findIndex((column) => column._id === over.id)

      // Sau khi có 2 vị trí rồi thì tiếp theo sẽ biến đổi mạng ban đầu lại [id-1 , id-2, id-3] -> [id-1, id-3, id-2]
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // Lấy ra mảng các id trong `dndOrderedColumns` -> Cần cái này để sau này gọi API cập nhật dữ liệu vào database
      // const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)

      // console.log('dndOrderedColumns', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

      setOrderedColumns(dndOrderedColumns)
    }
  }
  return (
    //  thằng Box trên mục đích là để hồi padding thôi để cho nó hiện thành scroll đẹp hơn
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          // Trick CSS scroll-bar cho dự án trello
          p: '10px 0'
        }}
      >
        {/* Column */}
        {/* Xử lý CSS scroll cho từng column, do ban đầu không có overflow: 'unset' nên nó không hiện thanh scroll */}
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
