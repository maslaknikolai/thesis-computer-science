import getCurrentUser from '../../middlewares/getCurrentUser'
import { storeTask } from '../../models/Task'
import saveBase64File from '../../utils/saveBase64File'
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

  sanitizedData.file = sanitizedData.file
    ? await saveBase64File(sanitizedData.file)
    : sanitizedData.file

  sanitizedData.user = user

  const task = storeTask(sanitizedData)

  res.json(task)
}
