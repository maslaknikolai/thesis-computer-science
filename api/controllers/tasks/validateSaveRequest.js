export default function validateSaveRequest (requestBody) {
  let result = true
  const errors = {
    name: [],
    type: [],
    questions: {
      errors: []
    }
  }

  if (!requestBody.name) {
    errors.name.push('Укажите название задания')
    result = false
  }

  if (!requestBody.type) {
    errors.type.push('Укажите тип задания')
    result = false
  }

  if (!['test', 'text'].includes(requestBody.type)) {
    errors.type.push('Укажите корректный тип задания')
    result = false
  }

  if (!requestBody.questions || !requestBody.questions.length) {
    errors.questions.errors.push('Добавьте список вопросов')
    result = false
  } else {
    requestBody.questions.forEach((question, questionIndex) => {
      errors.questions[questionIndex] = {
        text: [],
        isMultiple: [],
        options: {
          errors: []
        }
      }

      const questionErrors = errors.questions[questionIndex]

      if (!question.text) {
        questionErrors.text.push('Укажите вопрос')
        result = false
      }

      if (!('isMultiple' in question)) {
        questionErrors.isMultiple.push('Укажите тип ответа на вопрос')
        result = false
      }

      if (!question.options || !question.options.length) {
        questionErrors.options.errors.push('Укажите варианты ответов')
        result = false
      } else {
        const hasCorrectOption = question.options.some(option => option.isCorrect)

        if (!hasCorrectOption) {
          questionErrors.options.errors.push('Хотя бы один из вариантов должен быть верным')
          result = false
        }

        question.options.forEach((option, optionIndex) => {
          questionErrors.options[optionIndex] = {
            text: [],
            isCorrect: []
          }
          const optionErrors = questionErrors.options[optionIndex]

          if (!option.text) {
            optionErrors.text.push('Укажите текст ответа')
            result = false
          }

          if (!('isCorrect' in option)) {
            optionErrors.isCorrect.push('Укажите верен ли ответ')
            result = false
          }
        })
      }
    })
  }

  return {
    result,
    errors
  }
}
