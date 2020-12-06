<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Кабинет студента
        </v-card-title>

        <v-card-text>
          <nuxt-link to="/student/tasks">
            Задания
          </nuxt-link>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['studentOnly'],

  components: {
  }
}
</script>
