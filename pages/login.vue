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
            @focus="formData.login = null"
          />

          <v-text-field
            v-model="formData.password"
            :error-messages="errors.password"
            label="Пароль"
            type="password"
            @focus="formData.password = null"
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
  middleware: 'auth',
  auth: 'guest',

  data: () => ({
    loading: false,

    formData: {
      login: '',
      password: ''
    },
    errors: {}
  }),
  methods: {
    signIn () {
      this.errors = {}
      this.loading = true
      this.$auth.loginWith('local', { data: this.formData })
        .catch((error) => {
          try {
            this.errors = error.response.data.errors
          } catch {}
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
