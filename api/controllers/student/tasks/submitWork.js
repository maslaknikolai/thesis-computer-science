import getCurrentUser from '../../../middlewares/getCurrentUser'

export default async function submitWork (req, res) {
  const student = await getCurrentUser(req)

  console.log(req.body, student)
  res.json({
    data: null
  })
}
