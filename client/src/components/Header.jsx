import { useContext } from 'react'

import ColorModeContext from '../context/ColorModeContext'

import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

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
        position: 'relative'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: '600'
        }}
      >
        Which country in the world?
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IconButton aria-label="toggle-theme" onClick={toggleMode} sx={{ color: 'inherit' }}>
          {colorMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <Typography
          sx={{
            textTransform: 'capitalize',
          }}
        >
        {colorMode} mode
        </Typography>
      </Box>
    </AppBar>
  )
}

export default Header
