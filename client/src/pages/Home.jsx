import { useState, useEffect, useContext } from 'react'

import DataContext from '../context/DataContext'
import ColorModeContext from '../context/ColorModeContext'

import Header from '../components/Header'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

const Home = () => {

  function searchCountry(e) {
    const name = e.target.value.toLowerCase()
    const searchResult = countryData.filter(country => {

      const pattern = new RegExp(`^${name}`, 'i')

      return pattern.test(country.name.common)
    })

    if (name.length > 0) {
      setCountries(searchResult)
    }
  }

  function selectRegion(e) {

    const region = e.target.value
    const filteredCountries = countryData.filter(country => country.region === region)

    setCountries(filteredCountries)
    setFilter(region)

  }

  const countryData = useContext(DataContext)

  useEffect(() => {
    setCountries(countryData)
  }, [countryData])

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(countryData)
  const { colorMode } = useContext(ColorModeContext)

  return (
    <>
      <Header />
      <Box component='main' sx={{
        backgroundColor: colorMode === 'light' ? 'white' : 'hsl(207, 26%, 17%)',
        padding: '1em',
      }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            alignItems: { md: 'center' },
            justifyContent: { md: 'space-between' },
            gap: { xs: '3em' }
          }}
        >
          <SearchBar searchCountry={searchCountry} />
          <RegionFilter filter={filter} selectRegion={selectRegion} />
        </Stack>
        <CountryList countries={countries} />
      </Box>
    </>
  )
}

const SearchBar = ({ searchCountry }) => {

  const { colorMode } = useContext(ColorModeContext)

  return (
    <Box
      sx={{
        position: 'relative',
        padding: '1em 1em 1em 3em',
        backgroundColor: colorMode === 'light' ? 'white' : 'hsl(209, 23%, 22%)',
        color: colorMode === 'light' ? 'hsl(200, 15%, 8%)' : 'white',
        boxShadow: colorMode === 'light' ? '0 0 12px rgba(0, 0, 0, .2)' : 'none' ,
        borderRadius: '4px',
        overflow: 'hidden',
        width: '100%',
        height: '40px'
      }}
    >
      <InputBase
        placeholder='Search for a country'
        onChange={searchCountry}
        sx={{
          border: 'none',
          padding: '0 0 0 6em',
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        }}
      />
      <SearchIcon
        sx={{
          position: 'absolute',
          left: '1.5em',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'hsl(0, 0%, 52%)'
        }}
      />
    </Box>
  )
}

const RegionFilter = ({ filter, selectRegion }) => {

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const { colorMode } = useContext(ColorModeContext)

  return (
    <Box>
      <FormControl
        sx={{
          'fieldset': {
            border: colorMode === 'dark' && 'none'
          }
        }}
      >
        <InputLabel>Filter by Region</InputLabel>
        <Select
          autoWidth
          label='Filter by Region'
          value={filter}
          onChange={selectRegion}
          sx={{
            backgroundColor: colorMode === 'light' ? 'white' : 'hsl(209, 23%, 22%)',
            width: '200px'
          }}
        >
          {regions.map((region, i) => (
            <MenuItem
              key={i}
              value={region}
              root={{ color: 'red' }}
              sx={{
                width: '200px',
                root: {
                  color: 'red'
                }
              }}
            >{region}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

const CountryList = ({ countries }) => {

  const { colorMode } = useContext(ColorModeContext)

  return (
    <Stack
      direction='row'
      sx={{
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3em',
        padding: '2em 0'
      }}
    >
      {countries.length === 0
        ? <CircularProgress />
        : countries.map((country, i) => (
            <Card
              key={i}
              sx={{
                backgroundColor: colorMode === 'light' ? 'white' : 'hsl(209, 23%, 22%)',
                width: '300px',
                minHeight: '369.2px'
              }}
            >
              <CardActionArea
                href={`/country/${country.name.common.replace(/\s/g, '_')}`}
              >
                <CardMedia
                  component='img'
                  image={country.flags.svg}
                  alt={`Flag of ${country.name}`}
                  height={200}
                />
                <CardContent sx={{ padding: '2em' }}>
                  <Typography
                    variant='h6'
                    sx={{
                      marginBottom: '1em',
                      fontWeight: '900'
                    }}
                  >{country.name.common}</Typography>
                  <Typography>
                    <Typography variant='span' sx={{ fontWeight: '600' }}>Population: </Typography>
                    {country.population}
                  </Typography>
                  <Typography>
                    <Typography variant='span' sx={{ fontWeight: '600' }}>Region: </Typography>
                    {country.region}
                  </Typography>
                  <Typography>
                    <Typography variant='span' sx={{ fontWeight: '600' }}>Capital: </Typography>
                    {country.capital}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
    </Stack>
  )
}

export default Home
