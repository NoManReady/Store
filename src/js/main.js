import store from './store/index.js'

import Count from './component/Count.js'
import List from './component/List.js'

const formElement = document.querySelector('.js-form')
const inputElement = document.querySelector('.js-input')

formElement.addEventListener('submit', evt => {
  evt.preventDefault()

  let value = inputElement.value.trim()

  if (value.length) {
    store.dispatch('addItem', value)
    inputElement.value = ''
    inputElement.focus()
  }
})

const countInstance = new Count(document.querySelector('.js-count'))
const listInstance = new List(document.querySelector('.js-list'))

countInstance.render()
listInstance.render()

