<template>
  <div class="mb-2">
    <v-card>
      <v-card-title class="headline">
        {{ work.task.name }}
      </v-card-title>

      <v-card-text>
        <v-btn
          :to="`/teacher/works/${work.student.uuid}/${work.task.uuid}`"
        >
          Смотреть

          <v-icon right>
            mdi-chevron-right
          </v-icon>
        </v-btn>

        <div v-if="hasScore">
          Оценка:

          <div
            :class="[
              'display-2',
              colorClassName
            ]"
          >
            {{ score }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasScore () {
      return typeof this.work.score === 'number'
    },
    score () {
      return Math.max(
        2,
        this.work.score * 5
      )
    }
  }
}
</script>
