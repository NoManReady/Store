import Component from '../../lib/Component.js'
import store from '../store/index.js'

export default class Count extends Component {
  constructor(element) {
    super({
      store,
      element
    })
  }
  render() {
    let state = store.state
    let suffix = state.items.length !== 1 ? 's' : ''
    let emoji = state.items.length > 0 ? '&#x1f64c' : '&#x1f622'
    this.element.innerHTML = `
        <small>You've done</small>
        ${state.items.length}
        <small>thing today</small>
    `
  }
}