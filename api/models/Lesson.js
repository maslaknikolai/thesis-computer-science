import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'

function updateLessonData (lessonUUID, data) {
  const index = db.getIndex('/lessons', lessonUUID, 'uuid')
  let lessonRaw = db.getData(`/lessons[${index}]`)

  lessonRaw = {
    ...lessonRaw,
    ...data
  }

  db.push(`/lessons[${index}]`, lessonRaw, true)
}

export default function createLesson ({
  uuid,
  name,
  forSchoolClasses,
  date,
  duration,
  presentStudents
}) {
  return {
    uuid,
    name,
    forSchoolClasses,
    date: moment(date).format('DD.MM.YYYY HH:mm:ss'),
    duration,
    presentStudents,

    getSchoolClasses () {
      return forSchoolClasses.map(
        schoolClassUUID => findSchoolClass({
          uuid: schoolClassUUID
        })
      )
    },

    markStudentPresence (studentUUID) {
      const newPresentStudents = [
        ...presentStudents,
        studentUUID
      ]
      updateLessonData(uuid, {
        presentStudents: newPresentStudents
      })
      this.presentStudents = newPresentStudents
    },

    checkStudentPresent (studentUUID) {
      return presentStudents.includes(studentUUID)
    }
  }
}

export function allLessons () {
  return db.getData('/lessons')
    .map(createLesson)
}

export function findLesson (data) {
  const lessons = db.getData('/lessons')
  const lesson = lessons.find((lessonItem) => {
    return Object.entries(data)
      .every(
        ([key, value]) => lessonItem[key] === value
      )
  })

  if (!lesson) {
    return false
  }

  return createLesson(lesson)
}

export function storeLesson ({
  name,
  date,
  duration,
  forSchoolClasses
}) {
  const lesson = {
    uuid: uuidv4(),
    name,
    date,
    duration,
    forSchoolClasses,
    presentStudents: []
  }

  db.push('/lessons[]', lesson, true)

  return createLesson(lesson)
}
