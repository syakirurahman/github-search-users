import React from 'react'
import { setTitle, setHasMenu } from '../../layouts/app-layout/app-layout.store'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getLikedUsers } from './favourite.store'
import { Box, CircularProgress, Typography, Grid, } from '@mui/material'
import UserCard from '../../components/UserCard'
import GroupIcon from '@mui/icons-material/Group'
import { User } from '../user/user.store'

export default function Favorite(): JSX.Element {

  // local states

  // redux states
  const { users, isLoading, error } = useAppSelector(state => state.favourite)

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(setTitle('Favourite'))
    dispatch(setHasMenu(true))  
    dispatch(getLikedUsers())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{
      height: '87%',
    }}>
      <Box sx={{
        height: '100%',
        overflow: 'auto'
      }}>
        {
          isLoading ?
            <Box height="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <CircularProgress />
            </Box>
          :
            users.length > 0 ?
              <Box paddingY={1}>
                <Grid container spacing={2} paddingY={1} alignItems="start">
                  {
                    users.map((user: User) => 
                      <Grid key={user.login} item xs={6}>
                        <UserCard user={user} />
                      </Grid>
                    )
                  }
                </Grid>
              </Box>
            :
              error ?
                <Box height="400px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  <GroupIcon />
                  <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'error.main', marginTop: '10px' }}>
                    Error occured when fetching user data.<br/>
                    {error}
                  </Typography>
                </Box>
              :
                <Box height="400px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  <GroupIcon />
                  <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'text.secondary', marginTop: '10px' }}>
                    Once you like people, you'll see them here.
                  </Typography>
                </Box>
        }
      </Box>
    </Box>
  )
}