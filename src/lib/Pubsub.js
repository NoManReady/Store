import '../utils/plugins.js'
import { throwErr } from '../utils/index.js'

class Pubsub {
  constructor() {
    this.events = {}
  }
  subscribe(eventName, callback, scoped = null) {
    if (!callback instanceof Function) {
      throwErr('The callback type must be a function.')
    }
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = []
    }
    let index = this.events[eventName].push({ callback, scoped }) - 1
    return () => {
      return this.events[eventName].splice(index, 1)
    }
  }
  publish(eventName, payload, scoped = null) {
    if (!this.events.hasOwnProperty(eventName)) {
      console.warn(`Has no any callback resigister on ${eventName}`)
      return []
    }
    return this.events[eventName].map(event => event.callback.call(event.scoped, payload))
  }
  clear(eventName) {
    if (!this.events.hasOwnProperty(eventName)) {
      return false
    }
    return delete this.events[eventName]
  }
  clearAll() {
    this.events = {}
  }
}

export default Pubsub