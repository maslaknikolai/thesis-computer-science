<template>
  <div>
    <v-layout justify-end>
      <v-flex shrink>
        <v-btn
          text
          to="/teacher/lessons"
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
        {{ lesson.name }}
      </v-card-title>

      <v-card-text>
        <div>
          Классы:

          <span
            v-for="(schoolClass, i) in lesson.schoolClasses"
            :key="schoolClass.uuid"
          >
            <router-link
              :to="`/teacher/classes/${schoolClass.uuid}`"
            >
              {{ schoolClass.name }}
            </router-link>

            <template v-if="i !== lesson.schoolClasses.length - 1">, </template>
          </span>
        </div>

        <div>
          Дата проведения:
          {{ lesson.date }}
        </div>

        <div>
          Продолжительность:
          {{ lesson.duration }} мин.
        </div>

        <v-data-table
          :headers="[
            { text: 'Обучающийся', 'value': 'student' },
            { text: 'Класс', 'value': 'schoolClass' },
            { text: 'Присутствует', value: 'isCheckedIn' },
          ]"
          :items="lesson.students"
        >
          <template #item.student="{ item }">
            <router-link :to="`/teacher/student/${item.uuid}`">
              {{ item.name }}
            </router-link>
          </template>

          <template #item.schoolClass="{ item }">
            <router-link :to="`/teacher/classes/${item.schoolClass.uuid}`">
              {{ item.schoolClass.name }}
            </router-link>
          </template>

          <template #item.isCheckedIn="{ item }">
            {{ item.isCheckedIn ? 'Да' : '-' }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import LessonsService from '@/services/teacher/lessons'

export default {
  layout: 'teacher',

  async asyncData ({ $axios, params }) {
    const lesson = await LessonsService.show($axios, params.uuid)

    return {
      lesson
    }
  },
  data: () => ({
    lesson: null
  })
}
</script>
