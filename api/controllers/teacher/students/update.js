import { findUser } from '@/models/User'
import sanitizeRequestData from './sanitizeRequestData'
import validateSaveRequest from './validateSaveRequest'

export default function update (req, res) {
  const requestBody = req.body
  const validated = validateSaveRequest(requestBody, 'update')

  if (!validated.result) {
    res.status(422)
    return res.json({ errors: validated.errors })
  }

  const sanitizedData = sanitizeRequestData(requestBody)

  const student = findUser({ uuid: req.params.uuid })

  student.setLogin(sanitizedData.login)
  student.setName(sanitizedData.name)
  student.setSchoolClassUUID(sanitizedData.schoolClassUUID)

  if (requestBody.password) {
    student.setPassword(sanitizedData.password)
  }

  res.status(204).send()
}
