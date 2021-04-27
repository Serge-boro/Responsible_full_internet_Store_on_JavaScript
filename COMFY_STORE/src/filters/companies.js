import { getElement } from '../utils.js'
import display from '../displayProducts.js'

const setupCompanies = (store, location) => {
  const newItemStore = ['all', ...new Set(store.map((item) => item.company))]
  const newItems = newItemStore
    .map((item) => {
      return `<button class="company-btn">${item}</button>`
    })
    .join('')
  location.innerHTML = newItems

  location.addEventListener('click', (e) => {
    if (e.target.classList.contains('company-btn')) {
      let toggleArrey = []
      if (e.target.textContent === 'all') {
        toggleArrey = [...store]
      } else {
        toggleArrey = store.filter(
          (item) => item.company === e.target.textContent
        )
      }
      display(toggleArrey, getElement('.products-container'))
    }
  })
}

export default setupCompanies
