<template>
  <div>
    <slot
      :schoolClasses="schoolClasses"
      :schoolClassesLoading="loading"
    />
  </div>
</template>

<script>
import schoolClassesService from '~/services/schoolClasses'
export default {
  data: () => ({
    loading: false,
    schoolClasses: []
  }),
  created () {
    this.loading = true
    schoolClassesService.fetchKnown(this.$axios)
      .then((schoolClasses) => {
        this.schoolClasses = schoolClasses
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
