export default function sanitizeRequestData (requestBody) {
  return {
    name: requestBody.name,
    file: requestBody.file,
    type: requestBody.type,
    questions: requestBody.questions.map(
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
}
