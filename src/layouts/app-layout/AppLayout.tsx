import React, { SetStateAction } from 'react';
import { NavLink } from "react-router-dom";
import { ThemeProvider, createTheme, PaletteMode, Container, Grid, Box, Switch, Tooltip, Tab, Breakpoint, Typography } from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useAppSelector } from '../../redux/hooks'

interface AppLayoutProps {
  children: React.ReactNode
}

interface Menu {
  path: string,
  icon: JSX.Element,
  label: String
}

export default function AppLayout({ children }: AppLayoutProps): JSX.Element {

  const { title, hasMenu } = useAppSelector(state => state.appLayout)
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [containerWidth, setContainerWidth] = React.useState<Breakpoint>('xs')

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }
  React.useMemo(() => {
    const prevMode = localStorage.getItem('mode') as SetStateAction<PaletteMode>
    if (prevMode)
      setMode(prevMode)
  }, [])
  const theme = React.useMemo(() => {
      localStorage.setItem('mode', mode)
      return createTheme({
        palette: {
          mode,
          ...(mode === 'light') 
          ? {
              background: {
                paper: '#fcfcfc'
              }
            }
          : {
              background: {
                paper: '#212121'
              }
            }
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: '#ededed',
              }
            }
          }
        }
      })
    },
    [mode]
  )

  React.useEffect(() => {
    setContainerWidth((window.innerWidth > 700 && window.innerWidth < 1000) ? 'sm' : 'xs')
    function handleResize() {
      setContainerWidth((window.innerWidth > 700 && window.innerWidth < 1000) ? 'sm' : 'xs')
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menus: Menu[] = [
    {
      path: '/search',
      icon: <SearchIcon fontSize="small"/>,
      label: 'Search'
    },
    {
      path: '/favourite',
      icon: <FavoriteIcon fontSize="small"/>,
      label: 'Favourite'
    }
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        maxWidth={containerWidth}
        sx={{
          margin: '0 auto',
          height: '100vh',
          bgcolor: 'background.default',
          p: 2,
          position: 'relative',
          overflow: 'hidden',
          fontSize: 14
        }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {
                title !== '' ?
                  <Typography variant="h3" fontSize={20} fontWeight="bold">{title}</Typography>
                :
                  <NavLink to="/">
                    <HomeIcon sx={{ color: 'text.secondary' }} />
                  </NavLink>
              }
            </Grid>
            <Grid item>
              <Tooltip title="Dark mode">
                <Switch color="default" onChange={toggleMode} checked={(mode === 'dark')}/>
              </Tooltip>
            </Grid>
          </Grid>
          <Box sx={{
            height:'90%',
            py: 1
          }}>
            { children }
          </Box>
          {
            hasMenu ?
            <Grid container 
              zIndex={999} 
              bgcolor={theme.palette.background.paper}
              borderTop={`1px solid ${theme.palette.divider}`} 
              justifyContent="center" 
              position="absolute" bottom={0} left={0} right={0}>
              {
                menus.map((menu, i) => (
                  <Grid key={i} item xs={6} textAlign="center">
                    <NavLink
                      key={i}
                      to={menu.path}
                      style={({ isActive }) => ( isActive ? { textDecoration: 'none', color: `${theme.palette.primary.dark}` } : { textDecoration: 'none', color: `${theme.palette.text.secondary}` })}
                    >
                      <Tab icon={menu.icon} label={menu.label} style={{ width: '100%', opacity: '1', fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}/>
                    </NavLink>
                  </Grid>
                ))
              }
            </Grid>
            : ''
          }
      </Container>
    </ThemeProvider>
  )
}