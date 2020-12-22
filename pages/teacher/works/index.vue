<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-layout justify-space-between>
        <v-flex>
          <h1>Выполненные работы</h1>
        </v-flex>

        <v-flex shrink>
          <v-btn
            text
            to="/teacher/"
          >
            <v-icon left>
              mdi-chevron-left
            </v-icon>

            Назад
          </v-btn>
        </v-flex>
      </v-layout>

      <div
        v-if="!works.length"
        class="pa-4"
      >
        Нет выполненных работ
      </div>

      <WorkItem
        v-for="work in works"
        :key="work.uuid"
        :work="work"
      />
    </v-col>
  </v-row>
</template>

<script>
import WorksService from '~/services/teacher/works'
import WorkItem from '~/components/teacher/works/WorkItem.vue'
export default {
  middleware: ['teacherOnly'],

  components: {
    WorkItem
  },

  async asyncData ({ $axios, store }) {
    const works = await WorksService.list($axios)

    return {
      works
    }
  },

  data: () => ({
    works: []
  })
}
</script>
