import path from 'path'
import express from 'express'
import multer from 'multer'

import login from './controllers/auth/login'
import profile from './controllers/auth/profile'

import allSchoolClasses from './controllers/teacher/schoolClasses/list'
import showSchoolClass from './controllers/teacher/schoolClasses/show'
import createSchoolClass from './controllers/teacher/schoolClasses/store'
import updateSchoolClass from './controllers/teacher/schoolClasses/update'
import removeSchoolClass from './controllers/teacher/schoolClasses/remove'
import allStudents from './controllers/teacher/students/list'
import createStudent from './controllers/teacher/students/store'
import updateStudent from './controllers/teacher/students/update'
import removeStudent from './controllers/teacher/students/remove'
import teacherGetStudent from './controllers/teacher/students/show'
import teacherTasks from './controllers/teacher/tasks/table'
import teacherLessons from './controllers/teacher/lessons/table'
import createLessons from './controllers/teacher/lessons/store'
import showLesson from './controllers/teacher/lessons/show'
import removeLesson from './controllers/teacher/lessons/remove'
import showTeacherTask from './controllers/teacher/tasks/show'
import createTask from './controllers/teacher/tasks/store'
import removeTask from './controllers/teacher/tasks/remove'
import studentTasks from './controllers/student/tasks/list'
import showStudentTask from './controllers/student/tasks/show'
import studentLessons from './controllers/student/lessons/list'
import submitStudentTaskWork from './controllers/student/tasks/submitWork'
import allWorks from './controllers/teacher/works/list'
import getWork from './controllers/teacher/works/show'
import setWorkScore from './controllers/teacher/works/setWorkScore'
import checkInOnLesson from './controllers/student/lessons/checkInOnLesson'

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

app.get('/teacher/lessons', teacherLessons)
app.get('/teacher/lessons/:uuid', showLesson)
app.delete('/teacher/lessons/:uuid', removeLesson)
app.post('/teacher/lessons', createLessons)
app.get('/teacher/tasks', teacherTasks)
app.get('/teacher/tasks/:uuid', showTeacherTask)
app.post('/teacher/tasks', upload.single('file'), createTask)
app.delete('/teacher/tasks/:uuid', removeTask)
app.get('/teacher/works', allWorks)
app.get('/teacher/works/:uuid', getWork)
app.post('/teacher/works/:uuid/set-score', setWorkScore)
app.get('/teacher/students', allStudents)
app.post('/teacher/students', createStudent)
app.put('/teacher/students/:uuid', updateStudent)
app.delete('/teacher/students/:uuid', removeStudent)
app.get('/teacher/students/:uuid', teacherGetStudent)
app.get('/teacher/classes', allSchoolClasses)
app.get('/teacher/classes/:uuid', showSchoolClass)
app.delete('/teacher/classes/:uuid', removeSchoolClass)
app.post('/teacher/classes/', createSchoolClass)
app.put('/teacher/classes/:uuid', updateSchoolClass)

app.get('/student/tasks', studentTasks)
app.get('/student/tasks/:uuid', showStudentTask)
app.post('/student/tasks/:uuid', submitStudentTaskWork)
app.get('/student/lessons/', studentLessons)
app.post('/student/lessons/:uuid/check-in', checkInOnLesson)

export default app
