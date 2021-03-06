import React from 'react'
import _ from 'lodash'
import { TextField, Box, Grid, Typography, CircularProgress, Pagination } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { searchUsers, resetSearch } from './search.store'
import { setTitle, setHasMenu } from '../../layouts/app-layout/app-layout.store'
import SearchIcon from '@mui/icons-material/Search'
import UserCard from '../../components/UserCard'

export default function Search(): JSX.Element {


  // redux
  const dispatch = useAppDispatch()
  const { users, totalCount, isLoading, error, keyword, page: pageStore } = useAppSelector(states => states.search)

  // Local states
  const [page, setPage] = React.useState<number>(pageStore)
  const size = 10

  const handleSearch = _.debounce((value: string) => {
    if (value.length > 2) {
      setPage(1)
      dispatch(searchUsers(value, 1, size))
    }
    if (value.length === 0) {
      dispatch(resetSearch())
    }
  }, 500)

  const handlePageChange = (value: number) => {
    setPage(value)
    dispatch(searchUsers(keyword, value, size))
  }
  React.useEffect(() => {
    dispatch(setTitle('Search'))
    dispatch(setHasMenu(true))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{
      height: '87%',
    }}>
      <TextField 
        type="search" 
        fullWidth 
        placeholder='Enter GitHub username, i.e. gaearon' 
        defaultValue={keyword} 
        onChange={e => handleSearch(e.target.value)}
      />
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
                <Typography fontSize={12}>{totalCount} Github users found</Typography>
                <Grid container spacing={2} paddingY={1} minHeight="450px">
                  {
                    users.map((user, i) => 
                      <Grid key={i} item xs={6}>
                        <UserCard user={user} searchKeyword={keyword} />
                      </Grid>
                    )
                  }
                </Grid>
                <Pagination 
                  sx={{ mx: 'auto', mt: '7px', textAlign: 'center', width: 'max-content' }} 
                  color="primary" 
                  shape="rounded" 
                  count={Math.ceil(totalCount / size)} 
                  page={page}
                  onChange={(event, page) => handlePageChange(page)} />
              </Box>
            : 
              keyword.length <= 2 && !error ?
                <Box height="400px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                  <img src={require('assets/img/logo-img.svg').default} alt="Github logo" style={{ backgroundColor: '#fcfcfc', borderRadius: '70px', padding: '5px', marginBottom: '5px'}}/>
                  <img src={require('assets/img/logo-text.svg').default} alt="Github text logo" style={{ backgroundColor: '#fcfcfc', borderRadius: '50px', marginBottom: '10px' }}/>
                  <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'text.secondary' }}>
                    Enter GitHub username and search users matching the input like Google Search, click avatars to view more details, including repositories, followers and following.
                  </Typography>
                </Box>
              : 
                error ?
                  <Box height="400px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <SearchIcon />
                    <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'error.main' }}>
                      Error occured when fetching user data.<br/>
                      {error}
                    </Typography>
                  </Box>
                :
                  <Box height="400px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <SearchIcon />
                    <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'text.secondary' }}>
                      No search result found for <br/>
                      <strong>{keyword}</strong>
                    </Typography>
                  </Box>
        }
      </Box>
    </Box>
  )
}