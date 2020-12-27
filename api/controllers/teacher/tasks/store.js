import getCurrentUser from '../../../middlewares/getCurrentUser'
import { storeTask } from '../../../models/Task'
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

  sanitizedData.file = req.file.filename
  sanitizedData.user = user

  const task = storeTask(sanitizedData)

  res.json(task)
}
