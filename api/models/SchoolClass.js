import { v4 as uuidv4 } from 'uuid'
import db from '../dbProvider'

export default function createSchoolClass ({
  uuid,
  name
}) {
  return {
    uuid,
    name
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
