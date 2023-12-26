import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Card = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id, // Dữ liệu của thư viện nó hiểu là `id` nên là phải dùng `id`
    data: { ...card }
  })

  const dndKitCardStyles = {
    touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    // Thay vì là Transform thì chúng ta  sẽ để là Translate
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  // Check card actions
  const isShowCardActions =
    !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length ? true : false

  // Trong đây thôi mà

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '1px solid transparent',
        '&:hover': {
          borderColor: (theme) => theme.palette.primary.main
        }
        // Còn 2 cách nữa có thể dùng để khi sau này không sử dụng display được
        // overflow: card?.FE_PlaceholderCard ? 'hidden' : 'unset',
        // height: card?.FE_PlaceholderCard ? '0px' : 'unset'
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover} title={card.title} />}
      {/* Thằng CardContent mặc định nó có giá trị overflowY: 'hidden' */}
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            p: 1.5
          }
        }}
      >
        <Typography>{card.title}</Typography>
        {/* <Typography variant='body2' color='text.secondary'>
Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
continents except Antarctica
</Typography> */}
      </CardContent>
      {isShowCardActions && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds.length && (
            <Button size='small' startIcon={<GroupIcon />}>
              {card.memberIds.length}
            </Button>
          )}

          {!!card?.comments.length && (
            <Button size='small' startIcon={<CommentIcon />}>
              {card.comments.length}
            </Button>
          )}
          {!!card?.attachments.length && (
            <Button size='small' startIcon={<AttachmentIcon />}>
              {card.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
