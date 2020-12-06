import getAllSchoolClasses from '../../repositories/getAllSchoolClasses'

export default function fetchKnown (req, res) {
  const schoolClasses = getAllSchoolClasses()

  res.json({
    data: schoolClasses
  })
}
