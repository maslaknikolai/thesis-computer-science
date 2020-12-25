import { findUser } from '@/models/User'

export default function show (req, res) {
  const student = findUser({ uuid: req.params.uuid })

  res.json({
    data: {
      uuid: student.uuid,
      login: student.login,
      name: student.name,
      type: student.type,
      schoolClass: (() => {
        const { uuid, name } = student.getSchoolClass()
        return {
          uuid,
          name
        }
      })(),
      works: student.getWorks().map(work => ({
        uuid: work.uuid,
        score: work.score,
        task: (() => {
          const { uuid, name } = work.getTask()
          return { uuid, name }
        })()
      }))
    }
  })
}
