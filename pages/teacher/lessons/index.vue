<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-space-between">
          Уроки
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="lessons"
        >
          <template #item.name="{ item }">
            {{ item.name }}
          </template>

          <template #item.schoolClasses="{ item }">
            <span
              v-for="(schoolClass, i) in item.schoolClasses"
              :key="schoolClass.uuid"
            >
              <router-link
                :to="`/teacher/classes/${schoolClass.uuid}`"
              >
                {{ schoolClass.name }}
              </router-link>

              <template v-if="i !== item.schoolClasses.length - 1">, </template>
            </span>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LessonsService from '@/services/teacher/lessons'

export default {
  layout: 'teacher',

  async asyncData ({ $axios, store }) {
    const lessons = await LessonsService.list($axios)

    return {
      lessons
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Название урока',
        value: 'name'
      },
      {
        text: 'Для классов',
        value: 'schoolClasses'
      }
    ]
  }),
  methods: {
    async updateTable () {
      this.lessons = await LessonsService.list(this.$axios)
    }
  }
}
</script>
