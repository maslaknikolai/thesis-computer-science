<template>
  <v-dialog
    v-model="isShown"
    width="500"
  >
    <v-card>
      <v-card-title>
        {{ isEditing ? 'Редактировать класс' : 'Добавить класс' }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="formData.name"
          :error-messages="errors.name"
          label="Название класса"
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
// import StudentsLoader from '@/components/teacher/StudentsLoader.vue'
import SchoolClassesService from '~/services/teacher/schoolClasses'

const initialState = () => ({
  isShownImmutable: false,
  editingSchoolClassUUID: null,
  loading: false,
  formData: {
    name: ''

  },
  errors: {}
})

export default {
  components: {
    // StudentsLoader
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
      return !!this.editingSchoolClassUUID
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
        this.editingSchoolClassUUID = student.uuid
        this.formData.name = student.name
      }
    },
    save () {
      this.loading = true
      const request = this.isEditing
        ? SchoolClassesService.update(this.$axios, this.editingSchoolClassUUID, this.formData)
        : SchoolClassesService.store(this.$axios, this.formData)
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
