<template>
  <div>
    <v-layout justify-space-between>
      <v-flex>
        <h1>{{ work.task.name }}</h1>
        <h2>
          {{ work.student.name }},
          {{ work.student.schoolClass.name }}
        </h2>
      </v-flex>

      <v-flex shrink>
        <v-btn
          text
          to="/teacher/works"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>

          Назад
        </v-btn>
      </v-flex>
    </v-layout>

    <v-card v-if="work.task.type === 'text'">
      <v-card-text>
        &#34;{{ work.text }}&#34;
      </v-card-text>
    </v-card>

    <div v-else>
      <v-card
        v-for="(question, questionIndex) in work.task.questions"
        :key="questionIndex"
        class="mb-2"
      >
        <v-card-title>
          {{ question.text }}
        </v-card-title>

        <v-card-text>
          <v-radio-group
            v-if="!question.isMultiple"
            readonly
            :value="work.answers[questionIndex]"
          >
            <v-layout
              v-for="(option, optionIndex) in question.options"
              :key="optionIndex"
              align-center
              :value="option.isCorrect === work.answers[questionIndex]"
            >
              <v-radio
                :value="optionIndex"
                :label="option.text"
              />

              <v-icon
                v-if="option.isCorrect"
                color="green"
              >
                mdi-plus
              </v-icon>
            </v-layout>
          </v-radio-group>

          <div v-else>
            <v-layout
              v-for="(option, optionIndex) in question.options"
              :key="optionIndex"
              align-center
            >
              <v-checkbox
                v-model="work.answers[questionIndex][optionIndex]"
                :label="option.text"
                readonly
                hide-details
              />

              <v-icon
                v-if="option.isCorrect"
                color="green"
              >
                mdi-plus
              </v-icon>
            </v-layout>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <div>
      <v-chip-group
        v-model="work.score"
        active-class="primary--text"
        column
      >
        <v-chip
          v-for="scoreItem in 5"
          :key="scoreItem"
          :value="scoreItem"
        >
          {{ scoreItem }}
        </v-chip>
      </v-chip-group>

      <v-btn @click="setScore()">
        Поставить оценку
      </v-btn>
    </div>
  </div>
</template>

<script>
import WorksService from '~/services/teacher/works'

export default {
  layout: 'teacher',

  async asyncData ({ $axios, params }) {
    const work = await WorksService.show($axios, params.workuuid)

    return {
      work
    }
  },
  data: () => ({
    work: null
  }),
  methods: {
    async setScore () {
      await WorksService.setScore(this.$axios, this.$route.params.workuuid, this.work.score)
      this.$noty.success('Оценка поставлена')
    }
  }
}
</script>
