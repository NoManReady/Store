export default {
  addItem(store, payload) {
    store.commit('addItem', payload)
  },
  clearItem(store, payload) {
    store.commit('clearItem', payload)
  }
}
