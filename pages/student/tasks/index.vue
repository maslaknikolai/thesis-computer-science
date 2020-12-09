<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-layout justify-space-between>
        <v-flex>
          <h1>Задания</h1>
        </v-flex>

        <v-flex shrink>
          <v-btn
            text
            to="/student/"
          >
            <v-icon left>
              mdi-chevron-left
            </v-icon>

            Назад
          </v-btn>
        </v-flex>
      </v-layout>

      <div
        v-if="!tasks.length && !loading"
        class="pa-4"
      >
        Заданий нет
      </div>

      <TaskItem
        v-for="task in tasks"
        :key="task.uuid"
        :task="task"
        :work-of-task="getWorkOfTask(task)"
      />
    </v-col>
  </v-row>
</template>

<script>
import TasksService from '~/services/student/tasks'
import TaskItem from '~/components/student/tasks/TaskItem.vue'
export default {
  middleware: ['studentOnly'],

  components: {
    TaskItem
  },

  async asyncData ({ $axios, store }) {
    const tasks = await TasksService.index($axios)

    return {
      tasks
    }
  },

  data: () => ({
    tasks: []
  }),

  methods: {
    getWorkOfTask (task) {
      return this.$store.state.auth.user.works.find(
        work => work.taskUUID === task.uuid
      )
    }
  }
}
</script>
