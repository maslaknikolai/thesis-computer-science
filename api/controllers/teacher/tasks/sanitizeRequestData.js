export default function sanitizeRequestData (requestBody) {
  const body = {
    name: requestBody.name,
    file: requestBody.file,
    type: requestBody.type,
    forSchoolClasses: requestBody.forSchoolClasses || [],

    isIndividual: !!requestBody.isIndividual,
    forStudents: requestBody.forStudents || []
  }

  if (requestBody.type === 'test') {
    body.questions = requestBody.questions.map(
      question => ({
        text: question.text,
        isMultiple: Boolean(Number(question.isMultiple)),
        options: question.options.map(
          option => ({
            text: option.text,
            isCorrect: Boolean(Number(option.isCorrect))
          })
        )
      })
    )
  }

  return body
}
