import createTaskQuestionOptionResource from './taskQuestionOptionResource'

export default function createTaskQuestionResource (taskQuestion) {
  return {
    text: taskQuestion.text,
    isMultiple: taskQuestion.isMultiple,
    options: taskQuestion.options.map(createTaskQuestionOptionResource)
  }
}
