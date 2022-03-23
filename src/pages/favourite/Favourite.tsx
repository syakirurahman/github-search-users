import React from 'react'
import { setTitle, setHasMenu } from '../../layouts/app-layout/app-layout.store'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getLikedUsers } from './favourite.store'
import { Box, CircularProgress, Typography, Grid, } from '@mui/material'
import UserCard from '../../components/UserCard'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

export default function Favorite(): JSX.Element {

  // local states

  // redux states
  const { users, isLoading, error } = useAppSelector(state => state.favourite)

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(setTitle(''))
    dispatch(setHasMenu(false))  
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
                <Grid container spacing={2} paddingY={1} minHeight="450px">
                  {
                    users.map((user, i) => 
                      <Grid key={i} item xs={6}>
                        <UserCard user={user} />
                      </Grid>
                    )
                  }
                </Grid>
              </Box>
            :
              error ?
                <Box height="400px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  <VerifiedUserIcon />
                  <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'error.main' }}>
                    Error occured when fetching user data.<br/>
                    {error}
                  </Typography>
                </Box>
              :
                <Box height="400px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  <VerifiedUserIcon />
                  <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'text.secondary' }}>
                    Once you like people, you'll see them here.
                  </Typography>
                </Box>
        }
      </Box>
    </Box>
  )
}