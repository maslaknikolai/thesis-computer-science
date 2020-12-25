<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="justify-space-between">
          Классы
          <v-btn to="/teacher/classes/create">
            Добавить класс
          </v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="schoolClasses"
        >
          <template #item.name="{ item }">
            <router-link :to="`/teacher/classes/${item.uuid}`">
              {{ item.name }}
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ClassesService from '@/services/teacher/schoolClasses'
export default {
  layout: 'teacher',

  async asyncData ({ $axios, store }) {
    const schoolClasses = await ClassesService.list($axios)

    return {
      schoolClasses
    }
  },

  data: () => ({
    headers: [
      {
        text: 'Название',
        value: 'name'
      },
      {
        text: 'Кол-во учеников',
        value: 'studentsCount'
      }
    ]
  })
}
</script>
