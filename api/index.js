import express from 'express'

import login from './controllers/auth/login'
import profile from './controllers/auth/profile'
import fetchKnownSchoolClasses from './controllers/teacher/schoolClasses/fetchKnown'

import storeTask from './controllers/teacher/tasks/store'
import getAllMyTasks from './controllers/student/tasks/getAllMyTasks'
import showStudentTask from './controllers/student/tasks/show'
import submitStudentTaskWork from './controllers/student/tasks/submitWork'
import allWorks from './controllers/teacher/works/allWorks'
import getWork from './controllers/teacher/works/getWork'
import setWorkScore from './controllers/teacher/works/setWorkScore'

const app = express()

app.use(express.json({ limit: '50mb' }))

app.all('/test', (req, res) => {
  res.json({ data: 'data' })
})

app.post('/auth/login', login)
app.get('/auth/user', profile)

app.post('/teacher/tasks', storeTask)
app.get('/teacher/known-school-classes', fetchKnownSchoolClasses)
app.get('/teacher/works', allWorks)
app.get('/teacher/works/:workuuid', getWork)
app.post('/teacher/works/:workuuid/set-score', setWorkScore)

app.get('/student/my-tasks', getAllMyTasks)
app.get('/student/my-tasks/:uuid', showStudentTask)
app.post('/student/my-tasks/:uuid', submitStudentTaskWork)

export default app
