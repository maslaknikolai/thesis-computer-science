<template>
  <div>
    <v-layout
      justify-center
    >
      <v-card
        max-width="400px"
        width="100%"
      >
        <v-card-title>
          Войти
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="formData.login"
            :error-messages="errors.login"
            label="Логин"
          />

          <v-text-field
            v-model="formData.code"
            :error-messages="errors.code"
            label="Код"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn
            :loading="loading"
            @click="signIn()"
          >
            Войти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
export default {
  layout: 'no-sidebar',
  auth: 'guest',

  data: () => ({
    loading: false,

    formData: {
      login: '',
      code: ''
    },
    errors: {}
  }),
  methods: {
    async signIn () {
      this.loading = true

      try {
        const response = await this.$auth.loginWith('local', { data: this.formData })
        console.log(response)
      } catch (err) {
        if (err.response.data.errors) {
          try {
            this.errors = err.response.data.errors
          } catch {}
        }
      }

      this.loading = false
    }
  }
}
</script>
