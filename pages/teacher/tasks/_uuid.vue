<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-layout justify-end>
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
      </v-layout>

      <v-card>
        <v-card-title class="justify-space-between">
          Задание "{{ task.name }}"
        </v-card-title>

        <v-card-text>
          <div v-if="task.isIndividual">
            Индивидуально для:

            <span
              v-for="(student, i) in task.forStudents"
              :key="student.uuid"
            >
              <router-link
                :to="`/teacher/students/${student.uuid}`"
              >
                {{ student.name }}
              </router-link>

              <template v-if="i !== task.forStudents.length - 1">
                ,
              </template>
            </span>
          </div>

          <div v-else>
            Для классов:
            <span
              v-for="(schoolClass, i) in task.forSchoolClasses"
              :key="schoolClass.uuid"
            >
              <router-link
                :to="`/teacher/classes/${schoolClass.uuid}`"
              >
                {{ schoolClass.name }}
              </router-link>

              <template v-if="i !== task.forSchoolClasses.length - 1">
                ,
              </template>
            </span>
          </div>

          <br>

          Работы:
          <v-data-table
            :headers="[
              { text: 'ФИО обучающегося', 'value': 'student' },
              { text: 'Класс', 'value': 'schoolClass' },
              { text: 'Оценка', 'value': 'score' },
              { text: 'Работа', value: 'uuid' }
            ]"
            :items="task.works"
          >
            <template #item.uuid="{ item }">
              <router-link :to="`/teacher/works/${item.uuid}`">
                Посмотреть
              </router-link>
            </template>

            <template #item.student="{ item }">
              <router-link :to="`/teacher/students/${item.student.uuid}`">
                {{ item.student.name }}
              </router-link>
            </template>

            <template #item.schoolClass="{ item }">
              <router-link :to="`/teacher/classes/${item.student.schoolClass.uuid}`">
                {{ item.student.schoolClass.name }}
              </router-link>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TasksService from '~/services/teacher/tasks'
export default {
  layout: 'teacher',

  async asyncData ({ $axios, params }) {
    const task = await TasksService.show($axios, params.uuid)

    return {
      task
    }
  }
}
</script>
