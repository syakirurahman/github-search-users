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

  const setLikedUser = React.useCallback(() => {
    if (user.is_liked) 
      setIsLiked(true)
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    setLikedUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Link to={`/user/${user.login}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Paper
        sx={{
          display: 'flex',
          p: 1
        }}
      >
        <img src={user.avatar_url} alt={user.login} width="55px"/>
        <Box pl={1} width="100%">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', width: '100%' }}>
            <HighlightedText text={user.login} highlight={searchKeyword} />
            {
              isLiked ? 
                <FavouriteIcon sx={{ fontSize: "13px" }} color='error' onClick={(e) => { e.preventDefault(); unlike(user)}} />
              :
                <FavoriteBorderOutlinedIcon sx={{ fontSize: "13px" }} color='error' onClick={(e) => { e.preventDefault(); like(user)}} />
            }
          </div>
          <div>
            {
              user.followers && user.followers > 0 ?
                <Typography fontSize={11} lineHeight={1.2}>{user.followers} followers</Typography>
              : ''
            }
            {
            user.following && user.following > 0 ?
                <Typography fontSize={11} lineHeight={1.2}>{user.following} following</Typography>
              : ''
            }
          </div>

        </Box>
      </Paper>
    </Link>
  )
}

const HighlightedText = ({text = '', highlight = ''}: { text: string, highlight: string | undefined }): JSX.Element => {
  if(text.length > 13) {
    text = text.substring(0, 13) + '..'
  }
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, 'gi')
  const parts = text.split(regex)
  return (
    <span>
       {parts.filter(part => part).map((part, i) => (
           regex.test(part) ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
       ))}
   </span>
  )
}
