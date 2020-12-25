<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-space-between">
          Ученики
          <v-btn to="/teacher/classes/create">
            Добавить ученика
          </v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="students"
        >
          <template #item.name="{ item }">
            <router-link :to="`/teacher/students/${item.uuid}`">
              {{ item.name }}
            </router-link>
          </template>

          <template #item.schoolClass="{ item }">
            <router-link :to="`/teacher/classes/${item.schoolClass.uuid}`">
              {{ item.schoolClass.name }}
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import StudentsService from '~/services/teacher/students'
export default {
  layout: 'teacher',

  async asyncData ({ $axios, store }) {
    const students = await StudentsService.list($axios)

    return {
      students
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Имя',
        value: 'name'
      },
      {
        text: 'Класс',
        value: 'schoolClass'
      }
    ]
  })
}
</script>
