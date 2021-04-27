import { getElement } from '../utils.js'
import display from '../displayProducts.js'
const setupSearch = (store) => {
  const form = getElement('.input-form'),
    input = getElement('.search-input')

  form.addEventListener('keyup', (e) => {
    const value = input.value
    if (value) {
      const newStore = store.filter((item) => {
        let { name } = item
        if (name.toLowerCase().startsWith(value)) {
          return item
        }
      })
      display(newStore, getElement('.products-container'))

      if (newStore.length < 1) {
        getElement(
          '.products-container'
        ).innerHTML = `<h3 class='filter-error'>sorry, no products</h3>`
      }
    } else {
      display(store, getElement('.products-container'))
    }
  })
}

export default setupSearch
