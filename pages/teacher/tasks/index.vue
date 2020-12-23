<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-space-between">
          Задания
          <v-btn to="/teacher/tasks/create">
            Создать задание
          </v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="tasks"
        >
          <template #item.name="{ item }">
            <router-link :to="`/teacher/tasks/${item.uuid}`">
              {{ item.name }}
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TasksService from '~/services/teacher/tasks'
export default {
  layout: 'teacher',

  async asyncData ({ $axios, store }) {
    const tasks = await TasksService.table($axios)

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
        text: 'Для классов',
        value: 'forSchoolClasses'
      }
    ]
  })
}
</script>
