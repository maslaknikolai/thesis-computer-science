<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <SchoolClassEditModal
        ref="schoolClassEditModal"
        @saved="updateTable"
      />

      <v-card>
        <v-card-title class="justify-space-between">
          Классы
          <v-btn @click="$refs.schoolClassEditModal.Open()">
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

          <template #item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="$refs.schoolClassEditModal.Open(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SchoolClassEditModal from '@/components/teacher/classes/SchoolClassEditModal.vue'
import SchoolClassesService from '@/services/teacher/schoolClasses'
export default {
  layout: 'teacher',

  components: {
    SchoolClassEditModal
  },

  async asyncData ({ $axios, store }) {
    const schoolClasses = await SchoolClassesService.list($axios)

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
      this.schoolClasses = await SchoolClassesService.list(this.$axios)
    }
  }
}
</script>
