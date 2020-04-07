// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express() // create your express app

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/hello', (req, res) => {
  res.send({
    message: 'hello world!'
  })
})

app.listen(process.env.PORT || 8081, () => {
  var port = (process.env.PORT) ? process.env.PORT : 8081;
  console.log('Server listening on port ' + port + '.')
})

