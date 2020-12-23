export default function (context) {
  if (context.store.state.auth.user.type !== 'teacher') {
    return context.redirect('/')
  }
}
