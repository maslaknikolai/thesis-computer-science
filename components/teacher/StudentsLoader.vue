<template>
  <div>
    <slot
      :students="students"
      :studentsLoading="loading"
    />
  </div>
</template>

<script>
import studentsService from '@/services/teacher/students'
export default {
  data: () => ({
    loading: false,
    students: []
  }),
  created () {
    this.loading = true
    studentsService.list(this.$axios)
      .then((students) => {
        this.students = students
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
