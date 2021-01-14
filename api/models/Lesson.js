import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'

export default function createLesson ({
  uuid,
  name,
  forSchoolClasses,
  date,
  duration
}) {
  return {
    uuid,
    name,
    forSchoolClasses,
    date: moment(date).format('DD.MM.YYYY HH:mm:ss'),
    duration,

    getSchoolClasses () {
      return forSchoolClasses.map(
        schoolClassUUID => findSchoolClass({
          uuid: schoolClassUUID
        })
      )
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
    forSchoolClasses
  }

  db.push('/lessons[]', lesson, true)

  return createLesson(lesson)
}
