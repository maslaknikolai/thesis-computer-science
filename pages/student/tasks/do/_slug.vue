<template>
  <div>
    <v-card>
      <v-card-title>
        <v-flex>
          {{ task.name }}
        </v-flex>

        <v-flex shrink>
          <v-btn
            text
            to="/student/tasks"
          >
            <v-icon left>
              mdi-chevron-left
            </v-icon>

            Назад
          </v-btn>
        </v-flex>
      </v-card-title>

      <v-card-text>
        <v-btn
          v-if="task.file"
          small
          :href="task.file"
        >
          Скачать приложенный файл
        </v-btn>

        <div v-if="task.type === 'test'">
          <div
            v-for="(question, questionIndex) in task.questions"
            :key="questionIndex"
          >
            <v-divider class="my-2" />

            {{ question.text }}

            <v-radio-group
              v-if="!question.isMultiple"
              v-model="formData.answers[questionIndex]"
            >
              <v-radio
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                :label="option.text"
              />
            </v-radio-group>

            <div
              v-if="question.isMultiple"
            >
              <v-checkbox
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                v-model="formData.answers[questionIndex][optionIndex]"
                :label="option.text"
                hide-details
              />
            </div>
          </div>
        </div>
        <div v-if="task.type === 'text'">
          <v-textarea
            v-model="formData.text"
            label="Текст"
          />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          :loading="loading"
          @click="submit()"
        >
          Сдать работу
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import TasksService from '~/services/student/tasks'

export default {
  layout: 'student',

  async asyncData ({ $axios, params }) {
    const task = await TasksService.show($axios, params.slug)

    return { task }
  },

  data: () => ({
    task: null,

    loading: false,
    formData: {
      answers: [],
      text: ''
    }
  }),

  created () {
    if (this.task.questions) {
      this.formData.answers = this.task.questions.map(
        question => !question.isMultiple
          ? ''
          : question.options.map(option => false)
      )
    }
  },

  methods: {
    submit () {
      this.loading = true
      TasksService.submitWork(this.$axios, this.formData, this.task.uuid)
        .then(() => {
          this.$noty.success('Работа успешно сдана')
          this.$router.push('/')
        })
        .catch((error) => {
          if (error.message) {
            this.$noty.error(error.message)
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
