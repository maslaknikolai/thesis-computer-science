import { storeSchoolClass } from '@/models/SchoolClass'
import sanitizeRequestData from './sanitizeRequestData'
import validateSaveRequest from './validateSaveRequest'

export default function store (req, res) {
  const requestBody = req.body
  const validated = validateSaveRequest(requestBody)

  if (!validated.result) {
    res.status(422)
    return res.json({ errors: validated.errors })
  }

  const sanitizedData = sanitizeRequestData(requestBody)

  storeSchoolClass(sanitizedData)

  res.status(204).send()
}
