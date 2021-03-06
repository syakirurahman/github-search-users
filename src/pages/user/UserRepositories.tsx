import { Box, CircularProgress, Grid } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import RepositoryCard from '../../components/RepositoryCard'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUserRepositories } from './user.store'

export default function UserRepositories(): JSX.Element {
  const params = useParams()

  // local states

  // redux states
  const { userRepositories: repositories, isLoading } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const getRepositories = React.useCallback(() => {
    if(params.username) {
      dispatch(getUserRepositories(params.username))
    }
  }, [params.username]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    getRepositories()
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
              repositories.map((repo, i) => 
                <Grid key={i} item xs={6}>
                  <RepositoryCard repository={repo} />
                </Grid>
              )
            }
          </Grid>

      }
    </Box>

  )
}