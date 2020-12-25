<template>
  <div>
    <v-layout justify-end>
      <v-flex shrink>
        <v-btn
          text
          to="/teacher/students"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>

          Назад
        </v-btn>
      </v-flex>
    </v-layout>

    <v-card>
      <v-card-title>
        {{ student.name }}
      </v-card-title>

      <v-card-subtitle>
        Класс:

        <router-link :to="`/teacher/classes/${student.schoolClass.uuid}`">
          {{ student.schoolClass.name }}
        </router-link>
      </v-card-subtitle>

      <v-card-text>
        <v-data-table
          :headers="[
            { text: 'Задание', 'value': 'task' },
            { text: 'Оценка', 'value': 'score' },
            { text: 'Работа', value: 'uuid' },
          ]"
          :items="student.works"
        >
          <template #item.uuid="{ item }">
            <router-link :to="`/teacher/works/${item.uuid}`">
              Посмотреть
            </router-link>
          </template>

          <template #item.task="{ item }">
            <router-link :to="`/teacher/tasks/${item.task.uuid}`">
              {{ item.task.name }}
            </router-link>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import StudentsService from '~/services/teacher/students'

export default {
  async asyncData ({ $axios, params }) {
    const student = await StudentsService.show($axios, params.uuid)

    return {
      student
    }
  },
  data: () => ({
    student: null
  })
}
</script>
