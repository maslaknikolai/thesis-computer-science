export default function (context) {
  const userRole = context.store.state.auth.user.type

  if (userRole === 'teacher') {
    return context.redirect('/teacher/tasks')
  }

  if (userRole === 'student') {
    return context.redirect('/student')
  }
}
