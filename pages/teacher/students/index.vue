<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <StudentEditModal
        ref="studentEditModal"
        @saved="updateTable"
      />

      <v-card>
        <v-card-title class="justify-space-between">
          Обучающиеся
          <v-btn @click="$refs.studentEditModal.Open()">
            Добавить обучающегося
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

          <template #item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="$refs.studentEditModal.Open(item)"
            >
              mdi-pencil
            </v-icon>

            <v-icon
              small
              class="mr-2"
              @click="$confirm(
                'Вы действительно хотите удалить обучающегося? Все его работы будут также удалены',
                () => remove(item)
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
import StudentsService from '@/services/teacher/students'
import StudentEditModal from '@/components/teacher/students/StudentEditModal.vue'

export default {
  layout: 'teacher',

  components: {
    StudentEditModal
  },

  async asyncData ({ $axios, store }) {
    const students = await StudentsService.list($axios)

    return {
      students
    }
  },

  data: () => ({
    headers: [
      {
        text: 'ФИО обучающегося',
        value: 'name'
      },
      {
        text: 'Класс',
        value: 'schoolClass'
      },
      {
        text: 'Действия',
        value: 'actions',
        width: '100px'
      }
    ]
  }),
  methods: {
    async updateTable () {
      this.students = await StudentsService.list(this.$axios)
    },
    async remove (student) {
      await StudentsService.remove(this.$axios, student.uuid)
      this.updateTable()
    }
  }
}
</script>
