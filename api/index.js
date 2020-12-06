import express from 'express'

import login from './controllers/auth/login'
import profile from './controllers/auth/profile'

import storeTask from './controllers/tasks/store'

const app = express()

app.use(express.json({ limit: '50mb' }))

app.all('/test', (req, res) => {
  res.json({ data: 'data' })
})

app.post('/auth/login', login)
app.get('/auth/user', profile)

app.post('/tasks', storeTask)

export default app
