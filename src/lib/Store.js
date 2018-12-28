
import Pubsub from '../lib/Pubsub.js'

class Store {
  constructor({ state, actions, mutations } = { state: {}, actions: {}, mutations: {} }) {
    this.actions = actions
    this.mutations = mutations
    this.status = 'initialize'
    this.pubsub = new Pubsub()

    this.state = new Proxy(state, {
      set: (state, key, value) => {
        state[key] = value
        console.log(`stateChange->${key}:${value}`)
        this.pubsub.publish('stateChange', this.state)
        if (this.status !== 'mutation') {
          console.warn('Modify state must use a mutation.')
        }
        this.status = 'initialize'
        return true
      }
    })
  }
  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action ${actionKey} doesn't exit.`)
      return false
    }
    console.groupCollapsed(`Action:${actionKey}`)
    this.status = 'action'
    this.actions[actionKey](this, payload)
    console.groupEnd()
    return true
  }
  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.error(`Mutation ${mutationKey} doesn't exit.`)
      return false
    }
    this.status = 'mutation'
    let newState = this.mutations[mutationKey](this, payload)
    this.state = Object.assign(this.state, newState)
    return true
  }
}

export default Store