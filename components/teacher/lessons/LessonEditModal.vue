<template>
  <v-dialog
    v-model="isShown"
    width="500"
  >
    <v-card>
      <v-card-title>
        {{ isEditing ? 'Редактировать урок' : 'Добавить урок' }}
      </v-card-title>

      <v-card-text>
        <SchoolClassesLoader
          v-slot="{
            schoolClasses,
            schoolClassesLoading
          }"
        >
          <v-select
            v-model="formData.forSchoolClasses"
            :items="schoolClasses"
            item-value="uuid"
            item-text="name"
            :error-messages="errors.forSchoolClasses"
            multiple
            :loading="schoolClassesLoading"
            label="Для классов"
          />
        </SchoolClassesLoader>

        <v-text-field
          v-model="formData.name"
          :error-messages="errors.name"
          label="Название урока"
        />

        <date-time-picker
          v-model="formData.date"
          :error-messages="errors.date"
          label="Дата проведения"
          clear-text="Очистить"
        />

        <v-text-field
          v-model="formData.duration"
          :error-messages="errors.duration"
          label="Продолжительность, минут"
          type="number"
          min="1"
          ste
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
import DateTimePicker from '@/components/DateTimePicker.vue'
import LessonsService from '@/services/teacher/lessons'

const initialState = () => ({
  isShownImmutable: false,
  editingLessonUUID: null,
  loading: false,
  formData: {
    name: '',
    date: '',
    duration: 60,
    forSchoolClasses: []
  },
  errors: {}
})

export default {
  components: {
    SchoolClassesLoader,
    DateTimePicker
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
      return !!this.editingLessonUUID
    }
  },
  methods: {
    resetState () {
      Object.entries(initialState())
        .forEach(([key, value]) => {
          this[key] = value
        })
    },
    Open (lesson) {
      this.isShown = true

      if (lesson) {
        this.editingLessonUUID = lesson.uuid
        this.formData.name = lesson.name
        this.formData.date = lesson.date
        this.formData.duration = lesson.duration
        this.formData.forSchoolClasses = lesson.forSchoolClasses
      }
    },
    save () {
      this.loading = true
      const request = this.isEditing
        ? LessonsService.update(this.$axios, this.editingLessonUUID, this.formData)
        : LessonsService.store(this.$axios, this.formData)

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
