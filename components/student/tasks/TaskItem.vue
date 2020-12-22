<template>
  <div class="mb-2">
    <v-card>
      <v-card-title class="headline">
        {{ task.name }}
      </v-card-title>

      <v-card-text>
        <v-btn
          v-if="!hasWork"
          :to="`/student/tasks/do/${task.uuid}`"
        >
          Перейти к выполнению

          <v-icon right>
            mdi-chevron-right
          </v-icon>
        </v-btn>

        <div v-if="hasWork && !hasScore">
          На проверке...
        </div>

        <div v-if="hasScore">
          Ваша оценка:

          <div
            :class="[
              'display-2',
              scorecolorClassName
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
    task: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasWork () {
      return !!this.task.work
    },
    hasScore () {
      return this.hasWork && typeof this.task.work.score === 'number'
    },
    score () {
      if (!this.hasScore) {
        return null
      }

      return this.task.work.score
    },
    scorecolorClassName () {
      const scoreColors = {
        2: 'red--text',
        3: 'yellow--text',
        4: 'green--text',
        5: 'green--text'
      }

      const scorecolorClassName = Object.entries(scoreColors)
        .find(([scoreItem, color]) => +scoreItem === this.score)

      return scorecolorClassName ? scorecolorClassName[1] : ''
    }
  }
}
</script>
