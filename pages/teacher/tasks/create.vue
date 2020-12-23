<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline justify-space-between">
          <v-flex>
            Создать задание
          </v-flex>

          <v-flex shrink>
            <v-btn
              text
              to="/teacher/tasks"
            >
              <v-icon left>
                mdi-chevron-left
              </v-icon>

              Назад
            </v-btn>
          </v-flex>
        </v-card-title>

        <v-card-text>
          <TaskForm
            ref="taskForm"
            :errors="errors"
            @save="save"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn
            :loading="saving"
            @click="$refs.taskForm.save()"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TasksService from '~/services/teacher/tasks'
import TaskForm from '~/components/TaskForm/index.vue'

export default {
  layout: 'teacher',

  components: {
    TaskForm
  },

  data: () => ({
    saving: false,
    errors: null
  }),

  methods: {
    save (formData) {
      this.errors = null
      this.saving = true
      TasksService.store(this.$axios, formData)
        .then(() => {
          this.$noty.success('Задание успешно создано')
          this.$router.push('/')
        })
        .catch((error) => {
          if (error.messages) {
            this.errors = error.messages
          }
        })
        .finally(() => {
          this.saving = false
        })
    }
  }
}
</script>
