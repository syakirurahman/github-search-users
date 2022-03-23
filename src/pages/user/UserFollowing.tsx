import { Box, CircularProgress, Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import UserCard from '../../components/UserCard'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUserFollowing } from './user.store'

export default function UserFollowing(): JSX.Element {
  const params = useParams()
  // local states

  // redux states
  const { userFollowing: following, isLoading } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const getFollowing = React.useCallback(() => {
    if(params.username) {
      dispatch(getUserFollowing(params.username))
    }
  }, [params.username]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    getFollowing()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box minHeight="400px">
      {
        isLoading ?
          <Box height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <CircularProgress />
          </Box>
        :
          <Grid container spacing={2}>
            {
              following.map((following, i) => 
                <Grid key={i} item xs={6}>
                  <UserCard user={following} />
                </Grid>
              )
            }
          </Grid>

      }
    </Box>

  )
}