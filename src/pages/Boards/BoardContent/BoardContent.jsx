import { useCallback, useEffect, useRef, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  closestCorners,
  closestCenter,
  pointerWithin,
  rectIntersection,
  getFirstCollision
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
  // State để lưu lại column gốc ban đầu, không có truyền xuống các component nên không có cập nhật lại `state` này khi mà `card` thay đổi
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Điểm va chạm cuối cùng trước đó(xử lý thuật toán phát hiện va chạm)
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm column theo cardId => Nó sẽ trả về column có cái cardId được truyền vào, find() sẽ trả về giá trị của phần tử thoả mãn và bỏ qua các giá trị còn lại
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới. -> Rồi cập nhật lại cái state sau đó cập nhật lại Api của database
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId)) // Nếu có chứa thì trả về giá trị đó luôn còn không thì sẽ trả về undefined
  }

  // Hàm để setOrderedColumn lại sau khi đã kéo thả card giũa 2 column
  // Function chung xử lý việc cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    // Trong đây sẽ xử lý hết các vấn đề đó ở đây nha
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

      // Column cũ
      if (nextActiveColumn) {
        // Xóa card ở cái column active (cũng có thể hiểu là column cũ, cái khác mà kéo ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId)

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu => Trả về toàn bộ `Id` của các cái card trong column ấy
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }

      // Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xoá nó trước(này như bước kiểm tra cho chắc)
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId)

        // Dối với trường hợp handleDragEnd thì phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
        // Thằng toSpliced trả về một cái mảng mới thay vì sửa trực tiếp - cập nhật lại vào cái mảng ban đầu(khác với thz splice())
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }

      // console.log('nextColumns: ', nextColumns)

      // Sau khi lấy được cái overCardIndex rồi thì chúng ta sẽ sắp xếp nó lại

      return nextColumns
    })
  }

  // Trigger khi bắt đầu kéo một phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart >>>>> ', event)
    const isDraggingCard = event?.active?.data?.current.columnId
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(isDraggingCard ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    // Do khi bắt đầu chỉ có card hoặc là column được kéo mà thôi
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là hành động kéo card thì mới thưc hiện set giá trị oldColumn
    if (isDraggingCard) {
      // Khi bắt đầu kéo card lưu lại giá trị activeColumn
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
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

    // console.log('Old Column When Dragging Card', oldColumnWhenDraggingCard)

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
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // Trigger trong quá trình kéo (drag) một phần tử
  const handleDragEnd = (event) => {
    // Sẽ nhận được giá trị từ thư viện kéo thả của chúng ta -> event
    // console.log('handleDragEnd', event)

    const { active, over } = event

    // Kiểm tra nếu active hoặc over là null thì code sẽ không chạy nữa(kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return

    // Xử lý kéo thả Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hành động kéo thả card ở đây')

      // Chúng ta nên lấy cái activeDraggingCardId ở trong scrope của cái function này luôn cho dễ sử dụng
      const {
        id: activeDraggingCardId,
        // sửa lại tên biến để đọc tên biến là hiểu luôn
        // Khi thằng onDragOver nó `run` thì nó sẽ về giá trị khác
        data: { current: activeDraggingCardData }
      } = active
      // OverCard Là cái card đang tương tác với cái card đang được kéo ở trên hoặc là ở dưới(nghĩa là activeCard nằm ở trên hoặc ở dưới overCard)
      const { id: overCardId } = over

      // Tìm 2 cái columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không có activeColumn và overColumn thì return về luôn -> Để trành crash trang trang web
      if (!activeColumn || !overColumn) return

      // console.log('Handle DragItem Data : ', activeDragItemData)

      // Khi thực hiện `onDragOver` thì state đã được setState một lần  rồi nên lần này khi so sánh `activeColumn._id` và `overColumn._id` nó không còn chính xác nữa

      // Phải dùng tới activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id (set vào state từ bước handleDragStart) chứ không phải activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver tới đây thì state của card đã bị cập nhật một lần rồi/
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // console.log('Hành động kéo thả card giữa 2 column khác nhau')
        // Sẽ xử lý cho từng hành động trong các trường hợp này
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // console.log('Hành động kéo card trong cùng một cái column')
        // Hành động kéo thả card trong cùng cái column

        // lấy vị trí cũ (từ thằng oldColumnWhenDragginCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex((card) => card._id === activeDragItemId)

        // Lấy vị trí mới (từ thằng overColumn)
        const newCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

        // Dùng arrayMove vì kéo card trong một cái column thì tương tự với logic kéo column trong một cái board content
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard.cards, oldCardIndex, newCardIndex)

        // Lấy ra các mảng id sau này cập nhật lại API
        // const dndOrderedCardIds = dndOrderedCards.map((card) => card._id)

        // Việc sắp xếp card xong rồi thì cần phải cập nhật lại `state` cho nó chuẩn
        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới column mà chúng ta đang thả (column hiện tại đang kéo card)
          // Ở đây do kéo cùng một cái column nên cũng có thể sử dụng `activeDragItemId` hoặc là dùng `overCardId`
          const currentColumnDraggingCard = nextColumns.find((column) => column._id === overColumn._id)

          // cập nhật dữ liệu lại của cards và cardOrderedIds trong đây

          // currentColumnDraggingCard.cards thì được cập nhật bằng dndOrderedIds đã được sắp xếp ở bên trên rồi
          currentColumnDraggingCard.cards = dndOrderedCards

          currentColumnDraggingCard.cardOrderIds = dndOrderedCards.map((card) => card._id)

          // Cập nhật lại mảng cardOrderIds
          // currentColumnDraggingCard.cardOrderIds = currentColumnDraggingCard?.cards.map((card) => card._id)

          return nextColumns
        })
      }
    }

    // Xử lý với trường hợp là kéo thả Columnt trong một boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // console.log('Hành động kéo thả Column')
      // Khi mà vị trí nó có thay đổi thì mới xử lý tiếp
      if (active.id !== over.id) {
        // lấy vị trí cũ (từ thằng active)
        const oldColumnIndex = orderedColumns.findIndex((column) => column._id === activeDragItemId)

        // Lấy vị trí mới (từ thằng over)
        const newColumnIndex = orderedColumns.findIndex((column) => column._id === over.id)

        // Hàm arrayMove là hàm của dndKit dùng để biển đổi mảng column -> khi chúng có sự di chuyển tới vị trí khác
        // Sau khi có 2 vị trí rồi thì tiếp theo sẽ biến đổi mảng ban đầu lại [id-1 , id-2, id-3] -> [id-1, id-3, id-2]
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        // Lấy ra mảng các id trong `dndOrderedColumns` -> Cần cái này để sau này gọi API cập nhật dữ liệu vào database
        // const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id)

        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Những dữ liệu sau khi kéo thả luôn phải trả về null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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

  // custom lại thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giũa nhiều column
  const collisionDetectionStrategy = useCallback(
    (args) => {
      // Khi kéo thả column thì chúng ta dùng thuật toán `closestCorners` là chuẩn nhất
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      // Tìm các điểm giao nhau, va chạm - intersections với con trỏ
      // pointerIntersections thì cái hàm nó luôn luôn đảm bảo là nó sẽ tra ra một cái array rồi
      const pointerIntersections = pointerWithin(args)

      // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây
      const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)

      // Tìm overId đầu tiên trong đám intersections ở trên
      //  Hiện tại thằng intersections nó sẽ trả về cho chúng ta giá trị là data(không cần quan tâm tới thằng data này) mà chúng ta cần lấy là `id`
      let overId = getFirstCollision(intersections, 'id')

      if (overId) {
        // Phải kiểm tra overId không đôi lúc nó null sẽ là có vấn đề

        // Nếu cái over nó là column thì sẽ tìm tới cái cardId(chúng ta muốn gần overId sẽ là cái card bên trong column đấy) gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc là closestCorners đều được. Tuy nhiên ở đây dùng closestCenter chúng ta sẽ thấy mượt mà hơn.

        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          // ghi đè lại overId
          console.log('Over Id before', overId)
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              // Hiểu rồi
              (container) => container.id !== overId && checkColumn?.cardOrderIds.includes(container.id)
            )
          })[0]?.id // lấy ra phần tử đầu tiên và lấy `id` của nó ra

          // Thay vì trước đó ở đây là nó trả ra `columnId-02` bây giờ nó đã trả về giá trị id là `card-id-11` rồi -> Như vậy thì nó sẽ tránh được bug là flickering

          console.log('Over Id after', overId)
        }

        // Nếu có overId thì nó sẽ backup lại overId ở trên đây
        lastOverId.current = overId
        return [{ id: overId }]
      }

      // Nếu overId là null thì nó sẽ trả về mảng rỗng - tránh bug crash trang
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  return (
    //  thằng Box trên mục đích là để hồi padding thôi để cho nó hiện thành scroll đẹp hơn
    <DndContext
      sensors={sensors}
      // Thuật toán phát hiện va chạm (Nếu không có nó thì card với cover lớn sẽ không kéo qua column được vì lúc này nó đang bị conflict giữa card và column), chúng ta sẽ dùng closestCorners thay vì closestCenter

      // Nếu chỉ dùng closesetCorners sẽ có bug flickering + sai lệch dữ liệu
      // collisionDetection={closestCorners}

      // Tự custom nâng cao thuật toán phát hiện va chạm
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
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
