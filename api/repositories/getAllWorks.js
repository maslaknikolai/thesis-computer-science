import works from '../../services/teacher/works'
import db from '../dbProvider'
import { createWork } from '../models/Work'

export default function getAllWorks () {
  return db.getData('/users')
    .reduce((acc, student) => {
      return [
        ...acc,
        ...(student.works ? student.works.map(work => createWork({ ...work, student })) : [])
      ]
    }, [])
}
