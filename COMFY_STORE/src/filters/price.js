import { getElement } from '../utils.js'
import display from '../displayProducts.js'

const setupPrice = (store, filter, value) => {
  let maxPrice = store.map((item) => item.price)
  maxPrice = Math.max(...maxPrice)
  maxPrice = Math.ceil(maxPrice / 100)

  filter.value = maxPrice
  filter.max = maxPrice
  filter.min = 0
  value.textContent = `Value : $${maxPrice}`

  filter.addEventListener('input', () => {
    const valuePrice = parseInt(filter.value)
    value.textContent = `Value : $${valuePrice}`

    let newPrice = store.filter((item) => item.price / 100 <= valuePrice)
    if (newPrice.length < 1) {
      getElement(
        '.products-container'
      ).innerHTML = `<h3 class='filter-error'>sorry, we don't have any products for less price are you looking for</h3>`
    } else {
      display(newPrice, getElement('.products-container'))
    }
  })
}

export default setupPrice
