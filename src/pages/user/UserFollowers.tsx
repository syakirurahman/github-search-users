import { Box, CircularProgress, Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import UserCard from '../../components/UserCard'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUserFollowers } from './user.store'

export default function UserFollowers(): JSX.Element {
  const params = useParams()

  // local states

  // redux states
  const { userFollowers: followers, isLoading } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const getFollowers = React.useCallback(() => {
    if(params.username) {
      dispatch(getUserFollowers(params.username))
    }
  }, [params.username]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    getFollowers()
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
              followers.map((follower, i) => 
                <Grid key={i} item xs={6}>
                  <UserCard user={follower} />
                </Grid>
              )
            }
          </Grid>

      }
    </Box>

  )
}