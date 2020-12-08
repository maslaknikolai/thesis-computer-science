<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <h1>Задания</h1>

      <div
        v-if="!tasks.length && !loading"
        class="pa-4"
      >
        Заданий нет
      </div>

      <v-card
        v-for="task in tasks"
        :key="task.uuid"
      >
        <v-card-title class="headline">
          {{ task.name }}
        </v-card-title>

        <v-card-text>
          <nuxt-link :to="`/student/tasks/do/${task.uuid}`">
            Перейти к выполнению
          </nuxt-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TasksService from '~/services/student/tasks'
export default {
  middleware: ['studentOnly'],

  async asyncData ({ $axios }) {
    const tasks = await TasksService.index($axios)

    return {
      tasks
    }
  },

  data: () => ({
    tasks: []
  })
}
</script>
