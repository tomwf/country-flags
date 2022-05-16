import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import DataContext from '../context/DataContext'
import ColorModeContext from '../context/ColorModeContext'

import Header from '../components/Header'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const Country = () => {

  function prepareData(data) {

    const name = countryName.replace(/_/g, ' ')
    const countryInfo = data.filter(country => country.name.common === name)
    const codes = data.reduce((acc, cur) => {
      acc[cur.cca3] = cur.name.common
      return acc
    }, {})

    setCountry(countryInfo[0])
    setCountryCodes(codes)

  }

  function nativeName(country) {

    let nativeName

    if (country.name.hasOwnProperty('nativeName')) {

      const lang = Object.keys(country.name.nativeName).at(-1)

      nativeName = country.name.nativeName[lang].common

    } else {
      nativeName = country.name.common
    }

    return nativeName
  }

  function currencies(country) {

    let names = []

    if (country.hasOwnProperty('currencies')) {

      const currencies = Object.keys(country.currencies)

      names = currencies.map(currency => country.currencies[currency].name)

    } else {
      names.push('No currency available')
    }

    return names.join(', ')
  }

  function languages(country) {

    let languages = []

    if (country.hasOwnProperty('languages')) {

      const langs = Object.keys(country.languages)

      languages = langs.map(lang => country.languages[lang])

    } else {
      languages.push('No language spoken')
    }

    return languages.join(', ')
  }

  function borderCountries(country) {

    let borders = []

    if (country.hasOwnProperty('borders')) {
      borders = country.borders.map(code => countryCodes[code])
    } else {
      borders.push('No surrounding countries')
    }

    return borders
  }

  const data = useContext(DataContext)

  useEffect(() => {
    if (data.length > 0) {
      prepareData(data)
    }
  }, [data])

  const { countryName } = useParams()
  const [country, setCountry] = useState({})
  const [countryCodes, setCountryCodes] = useState({})
  const { colorMode } = useContext(ColorModeContext)

  return (
    <>
      <Header />
      <Box component='main' sx={{
        backgroundColor: colorMode === 'light' ? 'white' : 'hsl(207, 26%, 17%)',
        padding: '1em',
      }}
      >
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          href='/'
          sx={{
            backgroundColor: colorMode === 'light' ? 'white' : 'hsl(209, 23%, 22%)',
            color: 'inherit',
            boxShadow: colorMode === 'light' ? '0 0 12px rgba(0, 0, 0, .2)' : '0 0 12px rgba(0, 0, 0, .2)' ,
            padding: '.5em 2em',
            textTransform: 'capitalize',
            margin: '3em 0'
          }}
        >
          Back
        </Button>
        {
          Object.entries(country).length === 0
            ? <></>
            : (
              <Grid
                container
                columnSpacing={{ md: 6 }}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: { xs:  '420px', md: '100%' },
                  margin: '0 auto'
                }}
              >
                <Grid item xs={12} md={6}>
                  <Box
                    component='img'
                    src={country.flags.svg}
                    sx={{
                      display: 'block',
                      maxWidth: '420px',
                      margin: '0 auto',
                      padding: 0
                    }}
                  ></Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='h3' sx={{ margin: '1em 0' }}>{country.name.common}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack direction='row' spacing={10}>
                        <Stack spacing={2} sx={{ marginBottom: '3em' }}>
                          <Typography>
                            <Box component='span' sx={{ fontWeight: 600 }}>Native Name: </Box>
                            {nativeName(country)}
                          </Typography>
                          <Typography>
                            <Box component='span' sx={{ fontWeight: 600 }}>Population: </Box>
                            {country.population}
                          </Typography>
                          <Typography>
                            <Box component='span' sx={{ fontWeight: 600 }}>Region: </Box>
                            {country.region}
                          </Typography>
                          <Typography>
                            <Box component='span' sx={{ fontWeight: 600 }}>Sub Region: </Box>
                            {country.subregion}
                          </Typography>
                          <Typography>
                            <Box component='span' sx={{ fontWeight: 600 }}>Capital: </Box>
                            {country.capital}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={2} sx={{ marginBottom: '3em' }}>
                        <Typography>
                          <Box component='span' sx={{ fontWeight: 600 }}>Top Level Domain: </Box>
                          {country.tld ? country.tld[0] : 'No available Top Level Domain'}
                        </Typography>
                        <Typography>
                          <Box component='span' sx={{ fontWeight: 600 }}>Currency: </Box>
                          {currencies(country)}
                        </Typography>
                        <Typography>
                          <Box component='span' sx={{ fontWeight: 600 }}>Languages: </Box>
                          {languages(country)}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        sx={{
                          alignItems: { md: 'center' },
                          gap: '1em'
                         }}
                      >
                        <Typography sx={{ fontWeight: 600, display: 'block', minWidth: '120px' }}>Border Countries: </Typography>
                        <Stack direction='row' sx={{ flexWrap: 'wrap', gap: '1em' }}>
                          {
                            borderCountries(country).map((borderCountry, i) => (
                              <Typography
                                key={i}
                                sx={{
                                  padding: '.5em 1em',
                                  boxShadow: colorMode === 'light' ? '0 0 12px rgba(0, 0, 0, .2)' : '0 0 12px rgba(0, 0, 0, .2)' ,
                                }}
                              >
                                {borderCountry}
                              </Typography>
                            ))
                          }
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
        }
      </Box>
    </>
  )
}

export default Country
