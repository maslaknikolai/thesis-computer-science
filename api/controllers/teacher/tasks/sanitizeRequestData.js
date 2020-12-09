export default function sanitizeRequestData (requestBody) {
  const body = {
    name: requestBody.name,
    file: requestBody.file,
    type: requestBody.type,
    forSchoolClasses: requestBody.forSchoolClasses
  }

  if (requestBody.type === 'test') {
    body.questions = requestBody.questions.map(
      question => ({
        text: question.text,
        isMultiple: question.isMultiple,
        options: question.options.map(
          option => ({
            text: option.text,
            isCorrect: option.isCorrect
          })
        )
      })
    )
  }

  return body
}
