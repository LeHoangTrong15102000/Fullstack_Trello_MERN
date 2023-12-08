# File này sẽ ghi tóm tắt từng bài học trong phần clone trello app này

## Hiểu về CSS base line là gì

Nếu trong một dự án thực tế thì nên cần có CSSbaseline, còn trong những proj khác thì phải có normalCSS

CssBaseline hỗ trợ nhiều cho các trình duyệt

## Tìm hiểu về lỗi của Dark mode theme

- Chúng ta nên tìm hiểu để có một cái base vững chắc trước khi làm với những cái tiếp theo

- Migrate project đã tạo với CSS variable

- Thay thế `ThemeProvider = CssVarsProvider`

\*\* Remove toggle mode logic của thằng MUI vì mặc định thằng MUI nó khi mà refresh trang lại thì nó sẽ trở lại thành `Light Theme`

- Thì trong cái thằng Exp_extendTheme thì nó đã xài cái hooks useColorSchema để tự động truyền `color theme` vào localStorage cho chúng ta nên chúng ta không cần phải viết logic truyền vào localStorage nữa

- Cái hook `useColorSchema` nó đã làm cho chúng ta một bước là `lưu localStorage` rồi

\*\* Chúng ta phải hiểu cơ chế lưu giá trị MUI-mode trong localStorage

\*\* Fix cái vụ Flickering (nhấp nháy)

- Về cái vụ này thì những SSR thì mới có thể lưu ý để fix trường hợp lỗi như thế này, tên hàm để fix trong SSR là `getInitColorSchemaScript` để nó phía trước khi cái app chúng ta chạy

- Ở cách làm cũ thì chúng ta phải lấy ra giá trị của người dùng là `Light` hay `Dark` rồi chúng ta mới cập nhật vào `system website` -> Đó là dùng `useMediaQuery` để lấy ra giá trị dark hay light từ system của người dùng

- Trong mui người ta dùng prop là `Box` nó giống như là thẻ div vậy thôi, `sx prop` là cái css custom nhanh cho một cái giá trị cụ thể nào đấy (quick customize css) thì nó sẽ tương tự thuộc tính `style` trong thẻ div vậy

\*\* Hiểu về style thuần so với SX prop của MUI

- Chúng ta có thể custom spacing theo kiểu của bootstrap cũng được -> Sẽ được đặt trong phần theme của chúng ta hết những cái này -> `factor` chính là hệ số mà chúng ta truyền vào prop `gap` của MUI -> Đây là cách mà chúng ta có thể custom layout spacing đồng nhất trên toàn bộ trang web của chúng ta

- Vấn đề của thẻ `div` và thẻ `Box` -> Thì có thể hiểu như này `Box UI` là một component của thằng MUI chúng ta có tận dụng được nhiều thứ của nó như cái spacing vừa rồi

- Vậy vấn đề đặt ra là khi nào chúng ta dùng `style` và khi nào chúng ta sử dụng `sx prop in MUI` -> Tóm lại thằng MUI nó đã có cách làm của nó để tối ưu trang web(khi sinh ra quá nhiều thẻ style trên phần header)

- Khi mà dùng sx prop trong phần Box component của MUI thì chúng ta có thể truy cập được điểm break point trên các màng hình khác nhau

- Các phần docs trên mạng cho chúng ta thấy được sức mạnh của thằng MUI để chúng ta có tận dụng được sức mạnh của nó, chúng ta có thể tận dụng được -> Cái gì chúng ta dùng dược thì chúng ta nên dùng

- Sẽ hướng dẫn sử dụng tối đa khả năng của thằng MUI nhưng cái component của nó, chúng ta chỉ custom ít css nhất có thể để cho cái dự án chúng ta nó trơn tru

\*\* Nắm được SX prop styled APi hoặc Theme Override trong MUI

- Sẽ cho nhìn sơ qua cái themeOverride để sau khi này vào code chính thức chúng ta sẽ hiểu thật kĩ sâu về nó sau

- ThemeOverride khi mà chúng ta toàn bộ component có chung một kiểu

- Sẽ được sử dụng linh hoạt trong dự án để làm việc với MUI trong trang web

\*\* Custom css trong MUI như nào cho

- Hướng dẫn ghi đè lại giá trị css của thằng MUI
- Mặc định có 4 cách tiếp cận với style của thằng MUI -> Chúng ta sẽ linh hoạt sử dụng 4 cách này trong 1 dự án

> > \*\* Cách đầu tiên là One-off customization

- Để sửa nhanh thì chúng ta sử dụng SX prop của MUI để sửa nhanh
  ++ Khi vào muốn chỉnh thăng component con thì dùng nested component styled

- Chúng ta sẽ tập trung vấn đề về ghi đè cái style

- Chúng ta muốn tái sử dụng lại component thì chúng ta nên style nó bằng styled component

- Dynamic css cho chúng nó

- Css Variable thay vì sử dụng styled component thì nó sử dụng css variable

> > \*\* Global theme overrides

> > \*\* Global CSS override

- Giống như tạo file index.css để ghi đè toàn bộ giá trị css của app

- Thay vì phải viết file riêng thì thằng MUI nó hỗ trợ `GlobalStyle Component`

- Ngoài ra còn có thể sử dụng Cssbaseline -> Để thằng component bên dưới thuộc tính lightMode của MUI

- Nếu trong dự án mà chúng ta có sử dụng GlobalStyle Component thì hãy đưa nó vào `static constants` để trành việc nó `re-rendering`

- Khi mà dùng sx props thì chúng ta có thể truy cập đến `theme` của thằng MUI từ đó có thể truy cập đến từng breakpoint của trình duyệt để responsive -> Do đó thằng sx props sẽ có lợi nhiều hơn dùng style bình thường còn dùng style bình thường thì phải viết `media.query`
