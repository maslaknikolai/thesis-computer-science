<template>
  <div>
    Вопросы:

    <v-input
      v-if="errors && errors.errors"
      :error-messages="errors.errors"
      class="my-2"
    />

    <div
      v-for="(question, questionIndex) in questions"
      :key="question.uuid"
      class="pa-2"
    >
      <v-layout justify-end>
        <v-btn @click="removeQuestion(questionIndex)">
          Удалить вопрос
        </v-btn>
      </v-layout>

      <v-text-field
        v-model="questions[questionIndex].text"
        :error-messages="errors && errors[`${questionIndex}`] ? errors[`${questionIndex}`].text : null"
        label="Вопрос"
      />

      <v-radio-group
        v-model="questions[questionIndex].isMultiple"
        :error-messages="errors && errors[`${questionIndex}`] ? errors[`${questionIndex}`].isMultiple : null"
        row
      >
        <v-radio :value="false" label="Один правильный" />
        <v-radio :value="true" label="Несколько правильных" />
      </v-radio-group>

      <QuestionOptions
        :options="question.options"
        :errors="errors && errors[`${questionIndex}`] ? errors[`${questionIndex}`].options : null"
      />
    </div>

    <v-btn
      outlined
      small
      @click="addQuestion()"
    >
      Добавить вопрос
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import createQuestion from './createQuestion'
import QuestionOptions from './QuestionOptions.vue'

export default {
  components: {
    QuestionOptions
  },
  props: {
    questions: {
      type: Array,
      required: true
    },
    errors: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    addQuestion () {
      this.questions.push(createQuestion())
    },
    removeQuestion (questionIndex) {
      this.questions.splice(questionIndex, 1)
    }
  }
}
</script>
