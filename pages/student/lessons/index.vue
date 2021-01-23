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
              v-if="!item.isCheckedIn"
              small
              @click="checkIn(item)"
            >
              Отметиться на уроке
            </v-btn>

            <template v-else>
              Вы присутствуете
            </template>
          </template>

          <template #item.duration="{ item }">
            {{ item.duration }} мин.
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LessonsService from '@/services/student/lessons'
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
        text: 'Дата начала',
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
    }
  }
}
</script>
