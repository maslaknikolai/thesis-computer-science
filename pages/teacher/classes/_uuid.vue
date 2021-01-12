<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-layout justify-end>
        <v-flex shrink>
          <v-btn
            text
            to="/teacher/classes"
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
          Класс "{{ schoolClass.name }}"
        </v-card-title>

        <v-card-text>
          Обучающиеся:
          <v-data-table
            :headers="[
              { text: 'ФИО Обучающегося', 'value': 'name' },
            ]"
            :items="schoolClass.students"
          >
            <template #item.name="{ item }">
              <router-link :to="`/teacher/students/${item.uuid}`">
                {{ item.name }}
              </router-link>
            </template>
          </v-data-table>
          <br>
          Задания для класса
          <v-data-table
            :headers="[
              { text: 'Название', 'value': 'name' },
            ]"
            :items="schoolClass.tasks"
          >
            <template #item.name="{ item }">
              <router-link :to="`/teacher/tasks/${item.uuid}`">
                {{ item.name }}
              </router-link>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ClassesService from '@/services/teacher/schoolClasses'
export default {
  layout: 'teacher',

  async asyncData ({ $axios, params }) {
    const schoolClass = await ClassesService.show($axios, params.uuid)

    return {
      schoolClass
    }
  }
}
</script>
