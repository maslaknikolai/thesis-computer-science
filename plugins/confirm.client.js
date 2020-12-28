import Vue from 'vue'

Vue.prototype.$confirm = (text, onConfirm) => {
  if (confirm(text)) {
    onConfirm()
  }
}
