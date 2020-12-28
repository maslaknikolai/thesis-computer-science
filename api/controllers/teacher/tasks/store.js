import getCurrentUser from '@/middlewares/getCurrentUser'
import { storeTask } from '@/models/Task'
import sanitizeRequestData from './sanitizeRequestData'
import validateSaveRequest from './validateSaveRequest'

export default async function store (req, res) {
  const user = await getCurrentUser(req)

  const requestBody = req.body
  const validated = validateSaveRequest(requestBody)

  if (!validated.result) {
    res.status(422)
    return res.json({ errors: validated.errors })
  }

  const sanitizedData = sanitizeRequestData(requestBody)

  if (req.file) {
    sanitizedData.file = req.file.filename
  }

  sanitizedData.user = user

  storeTask(sanitizedData)

  res.status(204).send()
}
