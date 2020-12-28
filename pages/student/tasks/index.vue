<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-space-between">
          Задания
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="tasks"
        >
          <template #item.work="{ item }">
            <div v-if="item.work">
              {{ item.work.score || 'На проверке' }}
            </div>

            <router-link
              v-else
              :to="`/student/tasks/do/${item.uuid}`"
            >
              Выполнить
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TasksService from '@/services/student/tasks'
export default {
  layout: 'student',

  async asyncData ({ $axios, store }) {
    const tasks = await TasksService.index($axios)

    return {
      tasks
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Название',
        value: 'name'
      },
      {
        text: 'Моя оценка',
        value: 'work'
      }
    ]
  })
}
</script>
