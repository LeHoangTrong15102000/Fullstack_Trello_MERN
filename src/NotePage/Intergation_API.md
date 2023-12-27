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

## Hoàn thiện tích hợp kéo thả Card với API - phần 2

## Kỹ năng Debug gỡ lỗi quan trọng của lập trình viên

## Xoá Column và Card, code chi tiết từ FE tới BE

## Xoá ColumnId trong Board - phần bổ sung

## Deploy miễn phí NodeJS Back-end APIs lên Render

## Deploy miễn phí ReactJS Front-end lên Vercel
