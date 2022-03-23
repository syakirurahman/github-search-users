import React from 'react'
import { Box, Grid, Tab, Typography, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import { setTitle, setHasMenu } from '../../layouts/app-layout/app-layout.store'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUserDetail } from './user.store'
import ApartmentIcon from '@mui/icons-material/Apartment'

interface TabMenu {
  path: string,
  label: string
}

export default function User(): JSX.Element {
  const params = useParams()
  const location = useLocation()
  const theme = useTheme()
  // local states

  // redux states
  const { userDetail } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(setTitle(''))
    dispatch(setHasMenu(false))  
    if(params.username) {
      dispatch(getUserDetail(params.username))
    }
  }, [params.username]) // eslint-disable-line react-hooks/exhaustive-deps

  const tabMenus: TabMenu[] = [
    {
      path: 'repositories',
      label: `Repositories \n (${userDetail?.public_repos})`
    },
    {
      path: 'followers',
      label: `Followers \n (${userDetail?.followers})`
    },
    {
      path: 'following',
      label: `Following \n (${userDetail?.following})`
    }
  ]

  return (
    <Box height="100%" overflow="auto">
      {
        userDetail ?
          <>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" py={2}>
              <img src={userDetail?.avatar_url} alt={userDetail.name} width="150px" style={{ borderRadius: '100px', marginBottom: '10px' }} />
              <Typography sx={{ textAlign: 'center', maxWidth: '300px', fontSize:16, marginBottom: '10px' }}>
                <strong style={{ fontSize: 20 }}>{userDetail.name}</strong><br/>
                @{userDetail.login}
              </Typography>
              <div style={{ display: 'flex' }}>
                <ApartmentIcon fontSize='small' style={{ marginRight: '5px' }}/> {userDetail.location}
              </div>
            </Box>
            <Grid container borderBottom={`1px solid ${theme.palette.divider}`}>
              {
                tabMenus.map((tab, i) => 
                  <Grid key={i} item xs={4} textAlign="center">
                    <NavLink
                      to={tab.path}
                      style={({ isActive }) => 
                        {
                          return {
                            display: 'block', textDecoration: 'none', color: `${theme.palette.text.secondary}`, 
                            ...(isActive || (i === 0 && location.pathname.split('/').length < 4) ? { color: `${theme.palette.primary.dark}`, borderBottom: `1px solid ${theme.palette.primary.dark}` } : {} )
                          }
                        }
                      }
                    >
                      <Tab label={tab.label} sx={{ width: '100%', opacity: '1', fontSize: '14px', fontWeight: '500', py: '5px'}}/>
                    </NavLink>
                  </Grid>
              )
              }
            </Grid>
            <Box py={2}>
              <Outlet />
            </Box>
          </>
        :
        <Box height="400px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <SearchIcon />
          <Typography paragraph sx={{ textAlign: 'center', maxWidth: '300px', fontSize:14, color: 'error.main' }}>
            User data not found
          </Typography>
        </Box>
      } 
    </Box>
  )
}