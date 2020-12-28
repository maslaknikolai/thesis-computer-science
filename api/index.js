import path from 'path'
import express from 'express'
import multer from 'multer'

import login from './controllers/auth/login'
import profile from './controllers/auth/profile'

import allSchoolClasses from './controllers/teacher/schoolClasses/list'
import showSchoolClass from './controllers/teacher/schoolClasses/show'
import createSchoolClass from './controllers/teacher/schoolClasses/store'
import updateSchoolClass from './controllers/teacher/schoolClasses/update'
import allStudents from './controllers/teacher/students/list'
import createStudent from './controllers/teacher/students/store'
import updateStudent from './controllers/teacher/students/update'
import teacherGetStudent from './controllers/teacher/students/show'
import teacherTasks from './controllers/teacher/tasks/table'
import showTeacherTask from './controllers/teacher/tasks/show'
import storeTask from './controllers/teacher/tasks/store'
import removeTask from './controllers/teacher/tasks/remove'
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
app.delete('/teacher/tasks/:uuid', removeTask)
app.get('/teacher/works', allWorks)
app.get('/teacher/works/:uuid', getWork)
app.post('/teacher/works/:uuid/set-score', setWorkScore)
app.get('/teacher/students', allStudents)
app.post('/teacher/students', createStudent)
app.put('/teacher/students/:uuid', updateStudent)
app.get('/teacher/students/:uuid', teacherGetStudent)
app.get('/teacher/classes', allSchoolClasses)
app.get('/teacher/classes/:uuid', showSchoolClass)
app.post('/teacher/classes/', createSchoolClass)
app.put('/teacher/classes/:uuid', updateSchoolClass)

app.get('/student/tasks', studentTasks)
app.get('/student/tasks/:uuid', showStudentTask)
app.post('/student/tasks/:uuid', submitStudentTaskWork)

export default app
