<template>
  <v-dialog
    v-model="isShown"
    width="500"
  >
    <v-card>
      <v-card-title>
        {{ isEditing ? 'Редактировать данные обучающегося' : 'Добавить обучающегося' }}
      </v-card-title>

      <v-card-text>
        <SchoolClassesLoader
          v-slot="{
            schoolClasses,
            schoolClassesLoading
          }"
        >
          <v-select
            v-model="formData.schoolClassUUID"
            :items="schoolClasses"
            item-value="uuid"
            item-text="name"
            :error-messages="errors.schoolClassUUID"
            :loading="schoolClassesLoading"
            label="Класс"
          />
        </SchoolClassesLoader>

        <v-text-field
          v-model="formData.name"
          :error-messages="errors.name"
          label="ФИО обучающегося"
        />

        <v-text-field
          v-model="formData.login"
          :error-messages="errors.login"
          label="Логин для кабинета обучающегося"
        />

        <v-text-field
          v-model="formData.password"
          :error-messages="errors.password"
          type="password"
          label="Пароль от кабинета обучающегося"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="isShown = false"
        >
          Отмена
        </v-btn>

        <v-btn
          color="primary"
          text
          :loading="loading"
          @click="save()"
        >
          {{ isEditing ? 'Сохранить' : 'Добавить' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SchoolClassesLoader from '@/components/teacher/SchoolClassesLoader.vue'
import StudentsService from '@/services/teacher/students'

const initialState = () => ({
  isShownImmutable: false,
  editingStudentUUID: null,
  loading: false,
  formData: {
    name: '',
    login: '',
    password: '',
    schoolClassUUID: null
  },
  errors: {}
})

export default {
  components: {
    SchoolClassesLoader
  },
  data: initialState,
  computed: {
    isShown: {
      get () {
        return this.isShownImmutable
      },
      set (value) {
        this.isShownImmutable = value
        if (!value) {
          this.resetState()
        }
      }
    },
    isEditing () {
      return !!this.editingStudentUUID
    }
  },
  methods: {
    resetState () {
      Object.entries(initialState())
        .forEach(([key, value]) => {
          this[key] = value
        })
    },
    Open (student) {
      this.isShown = true

      if (student) {
        this.editingStudentUUID = student.uuid
        this.formData.name = student.name
        this.formData.login = student.login
        this.formData.schoolClassUUID = student.schoolClass.uuid
      }
    },
    save () {
      this.loading = true
      const request = this.isEditing
        ? StudentsService.update(this.$axios, this.editingStudentUUID, this.formData)
        : StudentsService.store(this.$axios, this.formData)
      request
        .then(() => {
          this.$emit('saved')
          this.isShown = false
        })
        .catch((error) => {
          if (error.messages) {
            this.errors = error.messages
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
