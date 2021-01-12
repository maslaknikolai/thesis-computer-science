import { v4 as uuidv4 } from 'uuid'
import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'

export default function createLesson ({
  uuid,
  name,
  forSchoolClasses
}) {
  return {
    uuid,
    name,
    forSchoolClasses,

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
  forSchoolClasses
}) {
  const lesson = {
    uuid: uuidv4(),
    name,
    forSchoolClasses
  }

  db.push('/lessons[]', lesson, true)

  return createLesson(lesson)
}
