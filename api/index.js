import path from 'path'
import express from 'express'
import multer from 'multer'

import login from './controllers/auth/login'
import profile from './controllers/auth/profile'

import allSchoolClasses from './controllers/teacher/schoolClasses/list'
import showSchoolClass from './controllers/teacher/schoolClasses/show'
import allStudents from './controllers/teacher/students/list'
import teacherGetStudent from './controllers/teacher/students/show'
import teacherTasks from './controllers/teacher/tasks/table'
import showTeacherTask from './controllers/teacher/tasks/show'
import storeTask from './controllers/teacher/tasks/store'
import studentTasks from './controllers/student/tasks/list'
import showStudentTask from './controllers/student/tasks/show'
import submitStudentTaskWork from './controllers/student/tasks/submitWork'
import allWorks from './controllers/teacher/works/allWorks'
import getWork from './controllers/teacher/works/getWork'
import setWorkScore from './controllers/teacher/works/setWorkScore'

const app = express()

const upload = multer({
  storage: multer.diskStorage({
    destination: 'api/uploads/task-files',
    filename: (req, file, callback) => {
      callback(null, (new Date().valueOf()) + '_' + file.originalname)
    }
  })
})

app.use(express.json())

app.use('/task-files', express.static(path.join(__dirname, 'uploads/task-files')))

app.all('/test', (req, res) => {
  res.json({ data: 'data' })
})

app.post('/auth/login', login)
app.get('/auth/user', profile)

app.get('/teacher/tasks', teacherTasks)
app.get('/teacher/tasks/:uuid', showTeacherTask)
app.post('/teacher/tasks', upload.single('file'), storeTask)
app.get('/teacher/works', allWorks)
app.get('/teacher/works/:workuuid', getWork)
app.post('/teacher/works/:workuuid/set-score', setWorkScore)
app.get('/teacher/students', allStudents)
app.get('/teacher/students/:uuid', teacherGetStudent)
app.get('/teacher/classes', allSchoolClasses)
app.get('/teacher/classes/:uuid', showSchoolClass)

app.get('/student/tasks', studentTasks)
app.get('/student/tasks/:uuid', showStudentTask)
app.post('/student/tasks/:uuid', submitStudentTaskWork)

export default app
