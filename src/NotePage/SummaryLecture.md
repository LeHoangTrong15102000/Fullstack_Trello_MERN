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

## Video Kéo thả trello

> > Xử lý chuẩn data sau khi kéo thả

- Cái việc đầu tiên chúng ta cần làm là chúng ta cần phải đưa dữ liệu `orderedColumn` của chúng ta ra ngoài dạng state để chúng ta cập nhật lại -> ăn lại State sẽ render lại component của chúng ta

- Do trong SortableContext chúng ta có trả về data: {...column} -> Nên khi kéo thả xong thì nó sẽ trả về data cho chúng ta dùng -> Nên cứ bỏ data vào sau này có cái mà dùng tới

- Tiếp theo sẽ quan tâm đến 2 thuộc tính sau khi thực hiện `handleDragEnd` là `active` và `over`

  - Để chúng ta biết là kéo từ thằng nào và đến vị trí nào'

- Tìm vị trí của từng thằng column một

- `arrayMove` là một hàm dùng để sắp xếp lại mảng columns ban đầu

> > Tìm code hàm arrayMove của thư viện dnd-kit

> > Bug click bị ăn vào sự kiện kéoo thả

- Khi click vào một cái column vẫn bị ăn sự kiện `handleDragEnd` hoặc là khi kéo tới chỗ không xác định thì vẫn ăn sự kiện `handleDragEnd`

> > Sensors - cảm biến kéo thả

- Mặc định của thằng dndContext nó sử dụng Pointer-Sensor

- Để fix cái lỗi khi nhấn vào column thì nó gọi hàm `handleDragEnd`

- Sensors mặc định nó sử dụng là Pointer và Keyboard

> > Kéo thả ở các thiết bị mobile

- Chỉ chỉ định touch-action CSS cho những component kéo thả -> Không có cách nào để ngăn chặn ở trình duyệt thì hãy set touchAction: 'none' là cách đáng tin cậy nhất để xử lý cái bug này.

- Đôi khi kéo ở bên dưới thì nó hơi giật cục một tí không mượn như `nắm ở đầu cột kéo`

- Nếu cái cách touch-action: 'none' không hoạt động đúng theo ý trong trường hợp cái case này của chúng ta -> Thì hãy dùng Mouse and Touch sensor để thay thế vào

- Nếu đã sử dụng `mouseSensor` và `touchSensor` rồi thì chúng ta không cần sử dụng thằng `pointerSensor - (sensor tại con trỏ điểm nữa)` nữa

-> Sẽ ưu tiên sử dụng kết hợp 2 loại sensor là mouse và touch để có trải nghiệm trên mobile là tốt nhất, không bị bug.

- Thuộc tính dung sai biểu thị khoảng cách, tính bằng pixel, của chuyển động được cho phép trước khi thao tác kéo bị hủy bỏ. Nếu ngón tay hoặc bút cảm ứng được di chuyển trong thời gian trễ và dung sai được đặt thành 0 thì thao tác kéo sẽ bị hủy ngay lập tức. Nếu đặt dung sai cao hơn, chẳng hạn như dung sai 5 pixel, thao tác sẽ chỉ bị hủy nếu ngón tay di chuyển hơn 5 pixel trong thời gian trễ.
  Thuộc tính này đặc biệt hữu ích cho đầu vào bằng cảm ứng, trong đó cần tính đến một số dung sai khi sử dụng giới hạn độ trễ, vì đầu vào bằng cảm ứng kém chính xác hơn so với đầu vào bằng chuột.

- ## Đọc hiểu thư viện Dndkit nâng cao

> > Hiểu cấu trúc dữ liệu demo của thư viện

- Kiểu dữ liệu trong thư viện may mắn thì nó giống với dữ liệu chúng ta trong dự án(Backend trả về) -> Đó là trường hợp lý tưởng -> Thực tế thì đời không như là mơ

- Và kiểu dữ liệu trong cấu trúc của thư viện nó sẽ khác hoàn toàn với kiểu dữ liệu của chúng ta

- Có thể chia sẻ luôn được luôn vì chúng ta đang làm dữ án -> Chúng ta có thể biến đổi kiểu dữ liệu hiện tại của dự án `Cards` và `Column` thành 2 state riêng biệt như là thư viện -> Để làm gì => Để tận dụng lại các logic mà nó đã làm trong file `MultipleContainer`

- Tuy nhiên có thể try hard để có kĩ năng hơn một tí là chúng ta sẽ sử dụng đúng kiểu dữ liệu của chúng ta -> Và chúng ta sẽ cố gắng đọc logic của thư viện để mà áp dụng vào dữ án

- Rán chịu khó đọc hiểu được logic của thằng thư viện

- Các video tiếp theo sẽ bắt đầu với thằng onDragStart và onDragEnd và onDragOver ,... -> 3 thằng này sẽ là 3 thằng chính trong cái dự án này

- 3 thằng này sẽ là xử lý chính trong việc chúng ta kéo thả `Cards` trong dữ án

- ## Thực hành nâng cao với kéo thả card với Dndkit: DragOverlay

- \*\*\*\* Xử lý bug khi kéo column bị Flickering -> Cái bug này thực chất liên quan đến chiều cao của cái phần tử kéo thả

  - Ở cái đoạn setNodeRef, DndkitColumnStyles attributes listeners của chúng ta -> Bug kéo thả được sinh ra từ đây

  - 2 column bằng chiều cao với nhau thì nó không có vấn đề gì, nhưng mà khi khác chiều cao với nhau thì nó sinh ra bug -> Đó là kéo thả bị Flickering

- Bây giờ chúng ta sẽ fix cái vấn đề này -> Sau khi đã fix được một chút vấn đề này rồi thì tiếp theo sẽ fix triệt để hơn nữa

- Mặc đinh cái div ngoài nó sẽ ăn chiều cao là 100%
- Nhưng mà cái chiều cao của thằng column02 và column03 cái chiều cao nó đang full cái boardContent -> Nên khi di chuyển khoảng màu xanh thì column02 và column03 nó cũng di chuyển theo -> Như thế này thì không được

- Do là khi sử dụng trên mobile và tablet khi mà dùng ngón tay để di chuyển cái vùng `Board` mà vô tình kéo cái column thì nó không hay lắm -> Thì cách fix nó sẽ là như thế nào -> Những cái này là tìm bug ra bug và fixx thôi(không ai dạy chúng ta cái này đâu)
  -> Thì cái phần `listeners` phải để vào phần box -> Hiểu đơn giản thì thằng listeners như là cái sự kiện lắng nghe keó thả -> Thì khi mà chúng ta kéo thả thì chúng ta chỉ kéo thả ở phần `Box`(phần chứa nội dung của column) mà thôi

- \*\*\*\* Dnd-kit DragOverlay - giữ chỗ khi kéo thả

- Tiếp theo trong phần column chúng ta muốn làm mờ phần kéo thả

- Thuộc tính isDragging là đang trong lúc kéo column

- Xử lý phần giữ chỗ cho card khi mà kéo thả

- Thì chúng ta sẽ sử dụng cấu trúc dữ liệu của chúng ta thay vì sử dụng cấu trúc dữ liệu của bọn thư viện

- Chúng ta cần phải làm sao mà phân biệt được 2 trường hợp là kéo thả card và kéo thả column -> Thì chúng ta cần phải có một hàm đó là `onDragStart` để biết khi mà bắt đầu kéo thì nó cần phải -> Sử dụng hàm này để biết được là nó đang kéo vào column hay kéo vào card và dựa thêm vào `data.current` bên trong hàm `onDragStart()` trả về(bởi vì cái Id về sau sẽ là một chuỗi kí tự ngẫu nhiên)

- Một cái card thì nó sẽ chứa `columnId` còn cái column thì nó sẽ không chứa `columnId` rồi chúng ta sẽ sử dụng cái này để phân biệt được là đang kéo card hay là keo column

- Thằng sortable bên trong `data.current` không hiểu gì thì chúng ta không dùng đến thằng đó trong phần xử lý của chúng ta

- ## Thực hành nâng cao với kéo thả card với Dndkit: onDragOver

- Đọc trước code logic của thằng onDragOver hiểu cái kiểu dữ liệu mà thư viện nó cung cấp cho chúng ta để có một tư duy tốt -> Để xong sau đó áp dụng vào kiểu dữ liệu của chúng ta(từ kiểu dữ liệu của thư viện áp dụng qua kiểu dữ liệu của chúng ta)

- Ở hàm handleDragEnd mình phải kiểm tra xem là mình đang kéo cái gì (column hay là card) -> Sử dụng `ACTIVE_DRAG_ITEM_TYPE` -> Lần sau sẽ xử lý lại cái handleDragEnd kĩ -> lần này khi mà ACTIVE_DRAG_ITEM_TYPE.CARD === activeDragItemType thì chúng ta return luôn không làm gì cả

- Bữa nay sẽ code không nhiều nhưng mà logic nó lại khó(game khó thì mới đáng chơi)

- Bây giờ cần phải lấy được activeId và overId -> Cần phải đặt tên cho nó rõ nghĩa

- Phải hiểu là chúng ta bây giờ đang xử lý dữ liệu trong cái hàm handleDragOver là chính nên là chúng ta sẽ lấy cái Id mà hàm bên trong nó trả về luôn

- Còn thằng state `activeDragItemId` để buổi tiếp thoe code tiếp handleDragEnd đã để coi chắc cốp là có sử dụng thằng `activeDragItemId` này hay không

  - const {
    id: activeDraggingCardId,
    data: { current: activeDraggingCardData }
    } = active
    => Nên destructuring dữ liệu ở bên trong đây luôn

- Tại sao chúng ta lại không dùng `columnId` trong lúc `active` và `over` mà phải tạo một hàm tìm kiếm cái column có cái `cardId` đó -> vì cái em nói kia anh check cũng thấy nó phát sinh nhiều vấn đề lắm, nên anh mới phải tìm cách phù hợp mà, nói chung như đi làm thực tế mình gặp vấn đề rồi mình linh hoạt giải quyết thôi

- Đôi lúc sau này đi làm sẽ phải làm code thuần javascript khá là nhiều -> Nên là cứ học chắc javascript để sau này đi làm không bị bỡ ngỡ -> Phải học nhiều thật là nhiều thì mới được

- Đoạn này bắt buộc phải lấy code của chúng nó thôi không còn cách nào khác -> Nhưng tới đoạn sau thì nó sẽ tự đúng mà thôi nên không cần phải lo

- Trường hơp này chúng ta sử dung spread operator cũng được nhưng nó sẽ có vấn đề về sau khi chúng ta muốn xử lý dữ liệu về state thì nó sẽ loạn lên

  - const nextColumns = [...prevColumns]

- Khi mình muốn làm kiểu này thì chúng ta muốn sao chép sâu(Clone Deep Array) cái mảng đó và chúng ta không muốn sao chép shalow(như spread operator)

- Tại sao chúng ta lại không sử dụng activeColumn và overColumn mà phải đi tạo 2 biến là `nextActiveColumn` và `nextOverColumn` -> Như đã nói thì chúng ta muốn `clone Deep` dữ liệu - `nextColumns` ra mới hoàn toàn và không muốn đụng chạm tới dữ liệu cũ -> Nên là tìm ra 2 mảng `nextActiveColumn` và `nextOverColumn` trong mảng `nextColumns` mới

- Do 2 thằng `nextActiveColumn` và `nextOverColumn` nằm tron thằng `nextColumns` -> Nên khi 2 thz này thay đổi thì `nextColumns` cũng thay đổi theo

- Khi chúng ta kéo và chúng ta thả ra thì nó sẽ có vấn đề nó chưa được chuẩn xác đâu -> Nên là cái này chúng ta sẽ xử lý nó ở `handleDragEnd` -> Còn `handleDragOver` chỉ là trong quá trình kéo -> Còn quá trình thả ra thì phải để `handleDragEnd` xử lý

- Còn một vấn đề nữa là khi kéo card nhỏ thì không sao còn khi kéo card to thì lại có vấn đề -> Sẽ xử lý ở những bước tiếp theo

- ## Thuật toán phát hiện va chạm với Dnd-kit'

- Thuật toán phát hiện va chạm nó đã có cho chúng ta 2 cái rồi

- Ngoài ra đôi lúc có trường hợp phức tạp -> Nó cần phải tự detect tự xử lý, tự phát hiện va chạm => Tự custom thì cái này nó khá là phức tạp hơn

- Rất may là có 1 thuật toán có thể giúp chúng ta xử lý cái vấn đề thả cái `card` đó -> Đó chính là thuật toán `Closest cornors` -> Chỉ cần nó va chạm tới cái góc của phần tử `droppable` là nó sẽ ăn ngay

- ## Hoàn thiện kéo thả card trong cùng Column

- ## Hoàn thiện kéo thả card giữa 2 column khác nhau

- ## Xử lý bug rất dị khi kéo thả - Dndkit

- ## Xử lý triệt để bug nhấp nháy khi kéo thả

- ## Xử lý Bug khi Column rỗng không chứa card
