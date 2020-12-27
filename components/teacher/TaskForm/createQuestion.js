import createOption from './createOption'

export default function createQuestion () {
  return {
    uuid: Math.random(),
    text: '',
    isMultiple: false,
    options: [
      createOption()
    ]
  }
}
