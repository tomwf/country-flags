import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import DataContext from './context/DataContext'
import ColorModeContext from './context/ColorModeContext'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { GlobalStyles } from '@mui/system'

import theme from './theme/theme'

import Home from './pages/Home'
import Country from './pages/Country'


function App() {

  function fetchData() {

    fetch('http://localhost:5000/api/all')
      .then(res => res.json())
      .then(data => {

        setCountryData(data)

        // Save data in local storage
        localStorage.setItem('countryData', JSON.stringify(data))

      })
      .catch(err => console.error(err))
  }

  const [countryData, setCountryData] = useState([])
  const [colorMode, setColorMode] = useState('dark')
  const extendedTheme = createTheme({
    ...theme,
    palette: {
      mode: colorMode
    }
  })
  const styles = {
    body: {
      backgroundColor: colorMode === 'light' ? 'white' : 'hsl(207, 26%, 17%)',
    },
    '#menu- > .MuiPaper-root': {
      backgroundColor: colorMode === 'light' ? 'white' : 'hsl(209, 23%, 22%)',
    }
  }

  useEffect(() => {

    let mode

    // Check for saved data so we don't have to fetch it on each render
    if (localStorage.getItem('countryData')) {

      const jsonData = localStorage.getItem('countryData')

      setCountryData(JSON.parse(jsonData))

    } else {
      fetchData()
    }

    // Check for current mode so the theme stays consistent after each page refresh
    if (localStorage.getItem('colorMode')) {

      mode = localStorage.getItem('colorMode')

      setColorMode(mode)

    } else {

      // Default color mode
      mode = 'dark'

      localStorage.setItem('colorMode', mode)
      setColorMode(mode)

    }

  }, [colorMode])

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      <ThemeProvider theme={extendedTheme}>
        <DataContext.Provider value={countryData}>
          <CssBaseline />
          <GlobalStyles styles={styles} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/country/:countryName' element={<Country />} />
          </Routes>
        </DataContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
