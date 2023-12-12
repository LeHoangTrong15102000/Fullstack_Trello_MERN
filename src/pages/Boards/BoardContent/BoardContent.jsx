import Box from '@mui/material/Box'

import ListColumns from './ListColumns/ListColumns'

// Còn chiều cao của LIST CARD sẽ linh hoạt để nó đáp ứng được với chiều cao

// Tổ chức lại cấu trúc code một cách khoa học Board - Columns - Cards cho nó hợp lí để dễ dàng mantaince sau này

const BoardContent = () => {
  return (
    //  thằng Box trên mục đích là để hồi padding thôi để cho nó hiện thành scroll đẹp hơn
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
      <ListColumns />
    </Box>
  )
}

export default BoardContent
