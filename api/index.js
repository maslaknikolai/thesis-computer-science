import bodyParser from 'body-parser'
import express from 'express'

import login from './login'
import getUser from './getUser'

const app = express()

app.use(bodyParser.json())

app.all('/getJSON', (req, res) => {
  res.json({ data: 'data' })
})

app.post('/auth/login', login)
app.get('/auth/user', getUser)

module.exports = app
