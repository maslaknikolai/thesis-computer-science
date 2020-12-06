<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Кабинет преподавателя
        </v-card-title>

        <v-card-text>
          <nuxt-link to="/teacher/create-task">
            Создать задание
          </nuxt-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['teacherOnly'],

  components: {
  }
}
</script>
