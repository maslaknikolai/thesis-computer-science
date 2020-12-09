export default function calculateTaskScore (task, answers) {
  const scoreForOneAnswer = 1 / task.questions.length

  const rightAnswers = answers.filter((answer, questionIndex) => {
    const question = task.questions[questionIndex]
    if (question.isMultiple) {
      return answer.every((checkState, i) => question.options[i] === checkState)
    }

    return question.options.findIndex(option => option.isCorrect) === answer
  })

  return Math.round(rightAnswers.length * scoreForOneAnswer)
}
