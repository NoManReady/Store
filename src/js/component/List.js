import Component from '../../lib/Component.js'
import store from '../store/index.js'

export default class List extends Component {
  constructor(element) {
    super({ store, element })
  }
  render() {
    let state = store.state
    if (state.items.length === 0) {
      this.element.innerHTML = `<p class="no-items">You've done nothing yet.</p>`
      return
    }
    this.element.innerHTML = `
        <ul class="app__items">
        ${state.items.map(item => {
        return `
              <li>${item}<button aria-label="Delete this item">×</button></li>
              `
      }).join('')}
        </ul>
    `
    this.element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        store.dispatch('clearItem', { index })
      })
    })
  }
}