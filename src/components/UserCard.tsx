import React from 'react'
import { Paper, Box, Typography } from '@mui/material'
import { User } from '../pages/user/user.store'
import _ from 'lodash'
import FavouriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useAppDispatch } from '../redux/hooks'
import { Link } from 'react-router-dom'
import { likeUser, unLikeUser } from '../pages/favourite/favourite.store'

interface UserCardProps {
  user: User,
  searchKeyword?: string
}

export default function UserCard({ user, searchKeyword }: UserCardProps): JSX.Element {

  const [isLiked, setIsLiked] = React.useState<boolean>(false)
  
  const dispatch = useAppDispatch()
  const like = (user: User) => {
    dispatch(likeUser(user))
    setIsLiked(true)
  }

  const unlike = (user: User) => {
    dispatch(unLikeUser(user))
    setIsLiked(false)
  }

  return (
    <Link to={`/user/${user.login}`}>
      <Paper
        sx={{
          display: 'flex',
          p: 1
        }}
      >
        <img src={user.avatar_url} alt={user.login} width="55px"/>
        <Box>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <HighlightedText text={user.login} highlight={searchKeyword} />
            {
              isLiked ? 
                <FavouriteIcon color='error' onClick={() => like(user)}/>
              :
                <FavoriteBorderOutlinedIcon color='error' onClick={() => unlike(user)} />
            }
          </div>
          <div>
            {
              user.followers && user.followers > 0 ?
                <div><Typography fontSize={12}>{user.followers} followers</Typography></div>
              : ''
            }
            {
            user.following && user.following > 0 ?
                <div><Typography fontSize={12}>{user.following} following</Typography></div>
              : ''
            }
          </div>

        </Box>
      </Paper>
    </Link>
  )
}

const HighlightedText = ({text = '', highlight = ''}: { text: string, highlight: string | undefined }): JSX.Element => {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, 'gi')
  const parts = text.split(regex)
  return (
    <span>
       {parts.filter(part => part).map((part, i) => (
           regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
       ))}
   </span>
  )
}
