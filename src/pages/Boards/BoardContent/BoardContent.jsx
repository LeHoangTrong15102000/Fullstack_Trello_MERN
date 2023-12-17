import { useEffect, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import Box from '@mui/material/Box'
import { arrayMove } from '@dnd-kit/sortable'
import cloneDeep from 'lodash/cloneDeep'

import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

// Còn chiều cao của LIST CARD sẽ linh hoạt để nó đáp ứng được với chiều cao

// Tổ chức lại cấu trúc code một cách khoa học Board - Columns - Cards cho nó hợp lí để dễ dàng mantaince sau này

// Kiểu item mà chúng ta đang kéo là kiểu gì là : Column hay card

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

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
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  //  Sắp xếp mảng column dựa trên mảng khác , sau này sẽ sắp xếp dựa trên mảng columnOrderIds từ BE trả về
  const [orderedColumns, setOrderedColumns] = useState([])
  // Cùng một thời điểm có column hoặc là card đang được kéo
  const [activeDragItemId, setActiveDragItemId] = useState(null) // khi bắt đầu kéo thì phải gán cái itemId vào state này
  const [activeDragItemType, setActiveDragItemType] = useState(null) // type này có thể dựa vào columnId để xác định được
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm column theo cardId => Nó sẽ trả về column có cái cardId được truyền vào, find() sẽ trả về giá trị của phần tử thoả mãn và bỏ qua các giá trị còn lại
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới. -> Rồi cập nhật lại cái state sau đó cập nhật lại Api của database
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId)) // Nếu có chứa thì trả về giá trị đó luôn còn không thì sẽ trả về undefined
  }

  // Trigger khi bắt đầu kéo một phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart >>>>> ', event)
    const isDraggingCard = event?.active?.data?.current.columnId
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(isDraggingCard ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    if (isDraggingCard) {
      // console.log('Dragging Card >>> true')
    }
  }

  // Trigger khi bắt đầu kéo qua một cái column khác(đè lên cái column khác thì nó sẽ chạy)
  const handleDragOver = (event) => {
    // Không làm gì thêm nếu đang kéo column -> Vì column chúng ta đã xử lý oke rồi nên chúng ta sẽ không đả động gì đến column cả
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Còn nếu kéo card thì chúng ta xử lý thêm để có thể kéo card qua lại giữa các column
    // console.log('HandleDragOver', event)
    const { active, over } = event

    // Nếu over là null thì code sẽ không chạy nữa(kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    // Ở dưới chúng ta sẽ xử lý sâu cái active nên là chúng ta sẽ kiểm trả thật là kĩ
    if (!active || !over) return

    // Chúng ta nên lấy cái activeDraggingCardId ở trong scrope của cái function này luôn cho dễ sử dụng
    const {
      id: activeDraggingCardId,
      // sửa lại tên biến để đọc tên biến là hiểu luôn
      data: { current: activeDraggingCardData }
    } = active
    // OverCard Là cái card đang tương tác với cái card đang được kéo ở trên hoặc là ở dưới(nghĩa là activeCard nằm ở trên hoặc ở dưới overCard)
    const { id: overCardId } = over

    // Tìm 2 cái columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không có activeColumn và overColumn thì return về luôn -> Để trành crash trang trang web
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // Vì đây đang là đoạn xử lý lúc (handleDragOver), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      // console.log('Code chạy vào đây')

      setOrderedColumns((prevColumns) => {
        // Xử lý state trong qua trình cập nhật dữ liệu

        // Tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard sắp được thả)
        const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)
        // console.log('overCardIndex', overCardIndex)

        // Logic tính toán cho cái "cardIndex mới" (trên hoặc dưới của overCard) lấy chuẩn ra từ code của thư viện - nhiều khi muốn từ chối hiểu :))
        let newCardIndex
        // Hiểu đơn giản là cardActive nằm ở trên hoặc là ở dưới overCard
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        // overItems của chúng nó tức là toàn bộ mảng Card (trongg cái card được over tới) -> Sẽ là overColumn.cards(danh sách card trong cái card được over)
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1

        //  Clone mảng OrderedColumnsState ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

        if (nextActiveColumn) {
          //
          // nextActiveColumn.cards = nextActiveColumn.cards.filter()
        }

        if (nextOverColumn) {
          //
        }

        // Sau khi lấy được cái overCardIndex rồi thì chúng ta sẽ sắp xếp nó lại

        return nextColumns
      })
    }
  }

  // Trigger trong quá trình kéo (drag) một phần tử
  const handleDragEnd = (event) => {
    // Sẽ nhận được giá trị từ thư viện kéo thả của chúng ta -> event
    // console.log('handleDragEnd', event)

    // Nếu là hành động kéo thả Card thì tạm thời dừng lại và không chạy
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hành động kéo thả Card - Tạm thời không làm gì cả')
      return
    }
    const { active, over } = event

    // Kiểm tra nếu active hoặc over là null thì code sẽ không chạy nữa(kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return

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

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  // Animation khi chúng ta thả(Drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ Overlay (video 32), khi kéo về thì cái bóng nó không bị biến mất nhưng khi mà kéo về thì nó bị che lại
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    //  thằng Box trên mục đích là để hồi padding thôi để cho nó hiện thành scroll đẹp hơn
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
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

        {/* sẽ để DragOverlay nằm song song với ListColumns */}
        <DragOverlay dropAnimation={customDropAnimation}>
          {/* Sẽ cần phải kiểm tra */}
          {!activeDragItemType && null}
          {/* Khi kéo một column thì chúng ta sẽ gọi 1 component column ở đây để giữ chỗ(Nếu không có thằng giữ chỗ thì component chỉ bị làm mờ đi) và không thấy được hình ảnh phần tử gốc đang bị kéo */}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
