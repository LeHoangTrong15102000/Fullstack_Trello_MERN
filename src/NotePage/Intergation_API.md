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

- Sau khi đã viết API xử lý `kéo thả card` trongg cùng một `column` rồi thì nó lại xuất hiện `1 con bug` cực kì khó nhằn

- Mặc dù đã gọi `API` cập nhật mảng `cardOrderIds` rồii nhừng mà mảng `cards` vẫn chưa sắp xếp -> Nên chúng ta sẽ sắp xếp nó lại ở phía `Client`

- Bug này phát sinh ra khi chúng ta bắt đầu ghép `API` đó là chuyện bình thường đi làm thực tế cũng vậy thôi - giao diện có thể hoạt động trơn tru nhưng mà khi ghép API vào thì nó lại bị lỗi, thì cái cấu trúc dữ liệu và vấn đề xử lý dữ liệu phát sinh

- Khi mà cái Board sau khi chúng ta gọi từ thằng cha thì cái mảng `cards` nó chưa được cập nhâjt

- Có nghĩa là ban đâu nó nhận vị trí Index theo mảng cards gốc ban đầu, mặc đù giao diện card trong column ban đầu vị trí các card trong UI khác so với vị trí `card` trong mảng `Cards` ban đầu -> DO đo khi kéo thả `vào lần đầu tiên` nó sẽ lấy vị trí `Index` của `card` trong mảng `cards` ban đầu dẫn `đến sai` -> Cái kiểu dữ liệu lúc này nó sẽ bị `conflict` với nhau nên xảy ra cái `bug` đó -> Nhưng đến lần kéo thả tiếp theo thì nó sẽ hết bị vấn đề này -> Bởi vì sau đến những lần tiếp theo thì nó - mảng `cards` nó đã được cập nhật rồi

- Do ban đầu thì khi mà truyền mảng `cards` từ thằng board xuống thằng mảng `cards` nó chưa được sắp xếp -> Cố gắng hiểu được đến đoạn này thì sẽ vỡ ra kiến thức rất là nhiều
- Nên là ban đầu 2 thằng `OldCardIndex`nó lấy giá trị trong mảng `cards` chưa được sắp xếp nên khi mà kéo lần đầu tiên thì nó sẽ sinh ra bug như vậy

- Thì để giải quyết vấn đề này thì chỉ cần chúng ta sắp xếp mảng `cards` ở trên `boardContent` là được -> Sắp xêp xong thì chúng ta truyền xuống dưới lại là `fix` được cái `bug` này

- Sau khi fetch dữ liệu về thì `mapOrder` cho `column` và `card` luôn

- Kéo `Card` từ `column` sang `column khác` thì được nhưng kéo qua xong rồi thì đừng kéo trong cùng `một column` nó sẽ gây làm loạn `data`

## Hoàn thiện tích hợp kéo thả Card với API - phần 2

- Xử lý kéo thả `card` giữa các `column` khác nhau và gọi API cập nhật

- Vấn đề kéoo card qua 2 column sẽ là nội dung khó nhất trong các video xử lý

## Kỹ năng Debug gỡ lỗi quan trọng của lập trình viên

## Xoá Column và Card, code chi tiết từ FE tới BE

## Xoá ColumnId trong Board - phần bổ sung

## Deploy miễn phí NodeJS Back-end APIs lên Render

## Deploy miễn phí ReactJS Front-end lên Vercel
