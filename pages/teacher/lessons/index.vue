<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <LessonEditModal
        ref="lessonEditModal"
        @saved="updateTable"
      />

      <v-card>
        <v-card-title class="justify-space-between">
          Уроки
          <v-btn @click="$refs.lessonEditModal.Open()">
            Добавить урок
          </v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="lessons"
        >
          <template #item.name="{ item }">
            <router-link
              :to="`/teacher/lessons/${item.uuid}`"
            >
              {{ item.name }}
            </router-link>
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

          <template #item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="$confirm(
                'Вы действительно хотите удалить урок?',
                () => removeLesson(item)
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
import LessonsService from '@/services/teacher/lessons'
import LessonEditModal from '@/components/teacher/lessons/LessonEditModal.vue'

export default {
  layout: 'teacher',

  components: {
    LessonEditModal
  },

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
      },
      {
        text: 'Дата проведения',
        value: 'date'
      },
      {
        text: 'Продолжительность, минут',
        value: 'duration'
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
      this.lessons = await LessonsService.list(this.$axios)
    },
    async removeLesson (lesson) {
      await LessonsService.remove(this.$axios, lesson.uuid)
      this.updateTable()
    }
  }
}
</script>
