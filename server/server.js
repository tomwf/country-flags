const express = require('express')
const axios = require('axios').default;
const path = require('path')
const app = express()

// Allow Cross Origin Requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/all', (req, res) => {

  const url = 'https://restcountries.com/v3.1/all'

  axios.get(url)
    .then(data => res.json(data.data))
    .catch(err => console.error(err))

})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT || 5000, () => {
  console.log('Running server on: http://localhost:5000')
})
