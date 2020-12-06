export default function (context) {
  if (context.store.state.auth.user.type !== 'student') {
    return context.redirect('/')
  }
}
