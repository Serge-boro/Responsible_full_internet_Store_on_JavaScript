// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js'
import { openCart } from './toggleCart.js'
import { findProduct } from '../store.js'
import addToCartDOM from './addToCartDOM.js'
// set items

const cartItemCountDOM = getElement('.cart-item-count')
const cartItemsDOM = getElement('.cart-items')
const cartTotalDOM = getElement('.cart-total')

let cartStore = getStorageItem('cart') //[]

export const addToCart = (dataID) => {
  let items = cartStore.find((item) => item.id === dataID)

  if (!items) {
    let product = findProduct(dataID)
    product = { ...product, amount: 1 }
    cartStore = [...cartStore, product]
    addToCartDOM(product)
  } else {
    const amountLocal = increaseAmountLocalst(dataID)
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')]
    const itemsAmount = items.find((item) => item.dataset.id === dataID)
    itemsAmount.textContent = amountLocal
  }

  displayCartItemCount()
  displayCartTotal()

  setStorageItem('cart', cartStore)
  openCart()
}

const displayCartItemCount = () => {
  const itemAmount = cartStore.reduce((total, item) => {
    return (total += item.amount)
  }, 0)
  cartItemCountDOM.textContent = itemAmount
}

const displayCartTotal = () => {
  const itemAmount = cartStore.reduce((total, item) => {
    return (total += item.price * item.amount)
  }, 0)
  cartTotalDOM.textContent = `Total : ${formatPrice(itemAmount)}`
}
const displayCartItemsDOM = () => {
  cartStore.forEach((item) => {
    addToCartDOM(item)
  })
}

const removeItem = (id) => {
  cartStore = cartStore.filter((item) => item.id !== id)
}

const decreaseAmountLocalst = (dataID) => {
  let newAmount
  cartStore = cartStore.map((item) => {
    if (item.id === dataID) {
      newAmount = item.amount - 1
      item = { ...item, amount: newAmount }
    }
    return item
  })
  return newAmount
}
const increaseAmountLocalst = (dataID) => {
  let newAmount
  cartStore = cartStore.map((item) => {
    if (item.id === dataID) {
      newAmount = item.amount + 1
      item = { ...item, amount: newAmount }
    }
    return item
  })
  return newAmount
}

const setupCartFunctionality = () => {
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target
    const parent = element.parentElement.parentElement
    const id = element.dataset.id
    const parentID = element.parentElement.dataset.id

    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id)
      parent.remove()
    }
    if (element.parentElement.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmountLocalst(parentID)
      element.parentElement.nextElementSibling.textContent = newAmount
    }

    if (element.parentElement.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmountLocalst(parentID)
      if (newAmount === 0) {
        removeItem(parentID)
        parent.parentElement.remove()
      } else {
        element.parentElement.previousElementSibling.textContent = newAmount
      }
    }

    displayCartItemCount()
    displayCartTotal()
    setStorageItem('cart', cartStore)
  })
}
const init = () => {
  displayCartItemCount()
  displayCartTotal()
  displayCartItemsDOM()
  setupCartFunctionality()
}

init()
