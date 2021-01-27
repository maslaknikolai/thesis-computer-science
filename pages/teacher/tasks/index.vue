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

          <template #item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="$confirm(
                'Вы действительно хотите удалить задание? Все выполненные работы этого задания также будут удалены',
                () => removeTask(item)
              )"
            >
              mdi-delete
            </v-icon>
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
    const tasks = await TasksService.list($axios)

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
      },
      {
        text: 'Для студентов',
        value: 'forStudents'
      },
      {
        text: 'Дата создания',
        value: 'createdAt'
      },
      {
        text: 'Действия',
        value: 'actions',
        width: '100px'
      }
    ]
  }),
  methods: {
    async removeTask (task) {
      await TasksService.remove(this.$axios, task.uuid)
      this.tasks = await TasksService.list(this.$axios)
    }
  }
}
</script>
