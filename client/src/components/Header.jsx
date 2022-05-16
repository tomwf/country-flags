import { useContext } from 'react'

import ColorModeContext from '../context/ColorModeContext'

import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Link from '@mui/material/Link'
import GitHubIcon from '@mui/icons-material/GitHub'

const Header = () => {

  function toggleMode() {
    if (colorMode === 'light') {
      setColorMode('dark')
      localStorage.setItem('colorMode', 'dark')
    } else {
      setColorMode('light')
      localStorage.setItem('colorMode', 'light')
    }
  }

  const { colorMode, setColorMode } = useContext(ColorModeContext)

  return (
    <AppBar
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colorMode === 'light' ? 'white' : 'hsl(209, 23%, 22%)',
        color: 'inherit',
        padding: '1em',
        position: 'relative',
        userSelect: 'none'
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontWeight: '600',
        }}
      >
        Which country in the world?
      </Typography>
      <IconButton
        sx={{
          position: 'relative',
          marginLeft: 'auto'
        }}
      >
        <Link
          href='https://github.com/tomwf/country-flags'
          underline='none'
          target="_blank"
          rel="noopener"
          sx={{
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0'
          }}
        >
        </Link>
        <GitHubIcon />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IconButton aria-label='toggle-theme' onClick={toggleMode} sx={{ color: 'inherit' }}>
          {colorMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
    </AppBar>
  )
}

export default Header
