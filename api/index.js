import express from 'express'

import login from './controllers/auth/login'
import profile from './controllers/auth/profile'

import allSchoolClasses from './controllers/teacher/schoolClasses/list'
import showSchoolClass from './controllers/teacher/schoolClasses/show'
import allStudents from './controllers/teacher/students/list'
import teacherGetStudent from './controllers/teacher/students/show'
import teacherTasks from './controllers/teacher/tasks/table'
import teacherTaskShow from './controllers/teacher/tasks/show'
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

app.get('/teacher/tasks', teacherTasks)
app.get('/teacher/tasks/:uuid', teacherTaskShow)
app.post('/teacher/tasks', storeTask)
app.get('/teacher/works', allWorks)
app.get('/teacher/works/:workuuid', getWork)
app.post('/teacher/works/:workuuid/set-score', setWorkScore)
app.get('/teacher/students', allStudents)
app.get('/teacher/students/:uuid', teacherGetStudent)
app.get('/teacher/classes', allSchoolClasses)
app.get('/teacher/classes/:uuid', showSchoolClass)

app.get('/student/my-tasks', getAllMyTasks)
app.get('/student/my-tasks/:uuid', showStudentTask)
app.post('/student/my-tasks/:uuid', submitStudentTaskWork)

export default app
