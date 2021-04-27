import { getElement } from '../utils.js'

const toggleCart = getElement('.toggle-cart'),
  cartOverlay = getElement('.cart-overlay'),
  cartClose = getElement('.cart-close')

toggleCart.addEventListener('click', () => {
  cartOverlay.classList.add('show')
})

cartClose.addEventListener('click', () => {
  cartOverlay.classList.remove('show')
})
export const openCart = () => {
  cartOverlay.classList.add('show')
}
