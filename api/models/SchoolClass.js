import { allTasks } from '@/models/Task'
import { v4 as uuidv4 } from 'uuid'
import db from '../dbProvider'
import { allStudents } from './User'

function updateSchoolClassData (workUUID, data) {
  const index = db.getIndex('/schoolClasses', workUUID, 'uuid')
  let schoolClassRaw = db.getData(`/schoolClasses[${index}]`)

  schoolClassRaw = { ...schoolClassRaw, ...data }

  db.push(`/schoolClasses[${index}]`, schoolClassRaw, true)
}

export default function createSchoolClass ({
  uuid,
  name
}) {
  return {
    uuid,
    name,

    getTasks () {
      return allTasks()
        .filter(task => task.forSchoolClasses.includes(
          uuid
        ))
    },

    getStudents () {
      return allStudents()
        .filter(student => student.schoolClassUUID === uuid)
    },

    setName (name) {
      updateSchoolClassData(uuid, { name })
      this.name = name
    },

    remove () {
      const index = db.getIndex('/schoolClasses', uuid, 'uuid')
      db.delete(`/schoolClasses[${index}]`, true)

      const students = this.getStudents()
      students.forEach(student => student.remove())

      const tasks = this.getTasks()
      tasks.forEach((task) => {
        task.setForSchoolClasses(task.forSchoolClasses.filter(item => item !== this.uuid))

        if (task.forSchoolClasses.length === 0) {
          task.remove()
        }
      })
    }
  }
}

export function allSchoolClasses () {
  return db.getData('/schoolClasses')
    .map(createSchoolClass)
}

export function findSchoolClass (data) {
  const schoolClasses = db.getData('/schoolClasses')
  const schoolClass = schoolClasses.find((schoolClassItem) => {
    return Object.entries(data)
      .every(
        ([key, value]) => schoolClassItem[key] === value
      )
  })

  if (!schoolClass) {
    return false
  }

  return createSchoolClass(schoolClass)
}

export function storeSchoolClass ({
  name
}) {
  const schoolClass = {
    uuid: uuidv4(),
    name
  }

  db.push('/schoolClasses[]', schoolClass, true)

  return createSchoolClass(schoolClass)
}
