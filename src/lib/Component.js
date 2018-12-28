import Store from './Store'
class Component {
  constructor({ store, element }) {
    if (store instanceof Store) {
      store.pubsub.subscribe('stateChange', (state) => this.render(state))
    }
    this.element = element
  }
  render(state) {
    console.log(state)
  }
}

export default Component