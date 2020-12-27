<script>
export default {
  middleware: (context) => {
    const userRole = context.store.state.auth.user.type

    if (userRole === 'teacher') {
      return context.redirect('/teacher')
    }

    if (userRole === 'student') {
      return context.redirect('/student')
    }
  }
}
</script>
