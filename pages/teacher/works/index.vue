<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-space-between">
          Выполненные работы
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="works"
        >
          <template #item.task="{ item }">
            <router-link :to="`/teacher/tasks/${item.task.uuid}`">
              {{ item.task.name }}
            </router-link>
          </template>

          <template #item.student="{ item }">
            <router-link :to="`/teacher/students/${item.student.uuid}`">
              {{ item.student.name }}
            </router-link>
          </template>

          <template #item.uuid="{ item }">
            <router-link :to="`/teacher/works/${item.uuid}`">
              Посмотреть
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import WorksService from '~/services/teacher/works'
export default {
  layout: 'teacher',

  async asyncData ({ $axios, store }) {
    const works = await WorksService.list($axios)

    return {
      works
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Задание',
        value: 'task'
      },
      {
        text: 'Студент',
        value: 'student'
      },
      {
        text: 'Оценка',
        value: 'score'
      },
      {
        text: 'Дата сдачи',
        value: 'createdAt'
      },
      {
        text: 'Работа',
        value: 'uuid'
      }
    ]
  })
}
</script>
