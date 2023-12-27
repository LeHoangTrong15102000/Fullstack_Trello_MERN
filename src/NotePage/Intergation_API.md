# Thực hiện tích hợp API vào Front-end

## Viết API Get Board Details - Bước đầu tích hợp vào Front-end

## Axios: Gọi API từ phía Front-end sao cho Clean Code

- Domain của thằng Back-end nên viết ra một biếnn constant để có thể dùng đi dùng lại nhiều

## CORS đâu có lỗi lầm gì | rất nhiều người đang hiểu nhầm về CORS

## Aggregate: Query tổng hợp, Join dữ liệu giữa các Collection

## Tạo UI/UX thêm mới Column & Card trong ứng dụng Trello

- Tạo state trong component `ListColumn` để biết khi nào hiện ra nút `Add new column` và khi nào hiển thị ra `input` để người dùng nhập `tên column` vào

- Thẻ `Input` của `MUI` thì cái `value` của nó ko được là giá trị `null`

- 3 Cái card thì cái card cuối cùng `boxShadow` bị mất

## React-Toastify: Hiển thị Flash Message chuyên nghiệp

## Fix bug kéo thả khi cần bôi đen Text bằng chuột

- Cái tên `data-no-dnd` mà chúng ta đặt ở trên `thẻ HTML` là do chúng ta đặt ra -> Và chỉ cần đặt có nghĩa là được rồi

## Viết 2 APIs tạo Column & Card trong ứng dụng Trello - phần 1

## Viết 2 APIs tạo Column & Card trong ứng dụng Trello - phần 2

- Lưu ý: Cách làm này phụ thuộc vào tuỳ lựa chọn và đặc thù dự án, có nơi thì `BE hỗ trợ` trả về luôn `toàn bộ board` dù đây có là `API` tạo `Column` hay là `Card` đi chăng nữa => Lúc này FE sẽ nhàn hơn

- Cái vấn đề phát sinh tiếp theo là khi `tạo Card` xong thì không thể kéo Card giữa các `column` khác nhau

- Cái vấn đề này nó liên quan tới một thứ hi vọng chúng ta còn nhớ -> Sẽ xử lý cái phần này ở đâu thì trước khi chúng `setBoard` ở trong `useEffect` -> Sau khi đã thêm `placeholderCard` vào `cards` rồi thì tiếp theo chúng ta sẽ thêm `card._id` vào `cardOrderIds`

- Nhưng cái column vừa tạo ra thì nó vẫn chưa có `placeholderCard` nên là nó vẫn không thể kéo card qua được

- Thì khi tạo mới `Column` thì cũng phải tạo ra một `placeholderCard` trong mảng `cards`

## Ghép 2 APIs tạo Column & Card vào giao diện Trello - phần 1

- Sau khi kéo xong mà F5 thì nó vẫn giữa được vị trí mà nó đã kéo thả

## Ghép 2 APIs tạo Column & Card vào giao diện Trello - phần 2

## Hoàn thiện tích hợp kéo thả Card với API - phần 1

- Sau khi kéo thả column thì cần phải cập nhật lại `API` và cập nhật lại trong `database` để lưu lại trạng thái sau khi `đã kéo thả` của chúng ta -> Làm như vậy thì mới được chứ kéo thả xong rồi mà F5 lại là mất đi trạng thái kéo thả đó thì sao được

- Bây giờ chúng ta cần tìm đến nơi `xử lý` cái `hành động` sau khi chúng ta kéo thả column xong -> Thì nó nằm ở `component` `BoardContent` -> Và chính xác là nằm ở hàm `handleDragEnd` `(Sau khi kết thúc hành động kéo thả)` -> Sau khi chúng ta `kết thúc` rồi chúng ta `có dữ liệu` rồi thì lúc đó chúng ta sẽ gọi tới `API` để `cập nhật` dữ liệu đó trong `database`

- Do vậy chúng ta sẽ thực hiện cái `flow` như buổi hôm trước là gọi `API` từu thằng cha và `truyền dữ liệu` xuống thằng con -> Khi nào chúng ta sử dụng `redux` thì mới có thể gọi `API` ngay chính thằng component đó

- Thì hàm xử lý gọi `API cập nhật column` lại trong database là `moveColumns` sẽ nhận vào một mảng là các `column` đã được `sắp xếp` `dndOrderedColumn` -> Có thể sử dụng `useDebounce` để hạn chế lại việc `gọi API` khi kéo thả `xong xuôi`

- Vẫn gọi update state ở đây để tránh deplay hoặc là flickering giao diện lúc kéo thả cần phải chờ gọi API (trick small) -> Vì khi kéo thả xong `update State` lại là nó ăn luôn vào ứng dụng tránh trường hợp `API gọi` bên trên đó `pending` -> Đây là `trick nhỏ` để xử lý `bất đồng bộ`

  - // Lấy ra mảng các id trong `dndOrderedColumns` -> Cần cái này để sau này gọi API cập nhật dữ liệu vào database
    // const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column.`_id`)

- Khi kéo thả column xong thì cái dữ liệu chúng ta quan tâm là `columnOrderIds` -> Vì thằng này sẽ làm sắp xếp lại mảng các `column` của chúng ta -> Khi mà kéo thả thì chúng ta quan tâm tới `vị trí` của `column` không cần quan tâm đến `column` làm gì -> Và cái `columnOrderIds` nó lại nằm trong `board` -> Và đó là cái cách mà chúng ta xử lý vấn đề.

- Đối với trường hợp cập nhật một bản ghi dù trong trường hợp nào đi chăng nữa thì chúng ta không cần `required()` -> Chúng ta chỉ `required()` khi chúng ta tạo mới một bản ghi mà thôi

- Sử dụng `allowUnknown` để cho phép không cần đấy một số `trường - field` lên

## Hoàn thiện tích hợp kéo thả Card với API - phần 2

## Kỹ năng Debug gỡ lỗi quan trọng của lập trình viên

## Xoá Column và Card, code chi tiết từ FE tới BE

## Xoá ColumnId trong Board - phần bổ sung

## Deploy miễn phí NodeJS Back-end APIs lên Render

## Deploy miễn phí ReactJS Front-end lên Vercel
