<template>
  <div>
    <v-text-field
      v-model="formData.name"
      :error-messages="errors ? errors.name : null"
      label="Название задания"
    />

    <SchoolClassesLoader
      v-slot="{
        schoolClasses,
        schoolClassesLoading
      }"
    >
      <v-select
        v-model="formData.forSchoolClasses"
        multiple
        :items="schoolClasses"
        item-value="uuid"
        item-text="name"
        :error-messages="errors ? errors.forSchoolClasses : null"
        :loading="schoolClassesLoading"
        label="Для каких классов"
      />
    </SchoolClassesLoader>

    <v-file-input
      v-model="formData.file"
      label="Файл"
    />

    <v-radio-group
      v-model="formData.type"
      :error-messages="errors ? errors.type : null"
      row
    >
      <v-radio value="test" label="Тест" />
      <v-radio value="text" label="Развернутый ответ" />
    </v-radio-group>

    <TestQuestions
      v-if="formData.type === 'test'"
      :questions="formData.questions"
      :errors="errors ? errors.questions : null"
    />
  </div>
</template>

<script>
import SchoolClassesLoader from '@/components/teacher/SchoolClassesLoader.vue'
import createQuestion from './createQuestion'
import TestQuestions from './TestQuestions.vue'

export default {
  components: {
    TestQuestions,
    SchoolClassesLoader
  },
  props: {
    task: {
      type: Object,
      default: null
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    formData: {
      name: '',
      file: null,
      forSchoolClasses: '',
      type: 'test', // test | text
      questions: [
        createQuestion()
      ]
    }
  }),
  methods: {
    // public
    save () {
      this.$emit('save', this.formData)
    }
  }
}
</script>
