<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-space-between">
          Уроки
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="lessons"
        >
          <template #item.actions="{ item }">
            <v-btn
              v-if="!item.isCheckedIn && getLessonDateStatus(item) === 'now'"
              small
              @click="checkIn(item)"
            >
              Отметиться на уроке
            </v-btn>

            <template v-if="item.isCheckedIn">
              Вы посетили урок
            </template>
          </template>

          <template #item.duration="{ item }">
            {{ item.duration }} мин.
          </template>

          <template #item.date="{ item }">
            <template v-if="getLessonDateStatus(item) === 'future'">
              Урок пройдет {{ item.date }}
            </template>

            <template v-if="getLessonDateStatus(item) === 'done'">
              Урок закончился {{ item.date }}
            </template>

            <template v-if="getLessonDateStatus(item) === 'now'">
              Урок идет
            </template>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LessonsService from '@/services/student/lessons'
import moment from 'moment'
export default {
  layout: 'student',

  async asyncData ({ $axios, store }) {
    const lessons = await LessonsService.index($axios)

    return {
      lessons
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Название',
        value: 'name'
      },
      {
        text: 'Время',
        value: 'date'
      },
      {
        text: 'Продолжительность',
        value: 'duration'
      },
      {
        text: 'Действия',
        value: 'actions'
      }
    ]
  }),
  methods: {
    async checkIn (lesson) {
      await LessonsService.checkIn(this.$axios, lesson.uuid)
      this.lessons = await LessonsService.index(this.$axios)
    },
    getLessonDateStatus (lesson) {
      const currentTs = new Date().valueOf()
      const startTs = moment(lesson.date, 'DD.MM.YYYY HH:mm:ss').valueOf()
      const durationTs = lesson.duration * 1000 * 60

      const fromStartTs = currentTs - startTs

      if (fromStartTs < 0) {
        return 'future'
      }

      if (fromStartTs > durationTs) {
        return 'done'
      }

      return 'now'
    }
  }
}
</script>
