export default function (context) {
  if (!['admin', 'teacher'].includes(context.store.state.auth.user.type)) {
    return context.redirect('/')
  }
}
