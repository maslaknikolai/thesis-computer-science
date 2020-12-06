export default function (context) {
  const userRole = context.store.state.auth.user.type

  if (['admin', 'teacher'].includes(userRole)) {
    return context.redirect('/teacher')
  }

  if (userRole === 'student') {
    return context.redirect('/student')
  }
}
