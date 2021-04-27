// global imports
import '../toggleSidebar.js'
import '../cart/toggleCart.js'
import '../cart/setupCart.js'
// specific
import { addToCart } from '../cart/setupCart.js'
import { singleProductUrl, getElement, formatPrice } from '../utils.js'

// selections
const loading = getElement('.page-loading'),
  centerDOM = getElement('.single-product-center'),
  pageTitleDOM = getElement('.page-hero-title'),
  imgDOM = getElement('.single-product-img'),
  titleDOM = getElement('.single-product-title'),
  companyDOM = getElement('.single-product-company'),
  priceDOM = getElement('.single-product-price'),
  colorsDOM = getElement('.single-product-colors'),
  descDOM = getElement('.single-product-desc'),
  cartBtn = getElement('.addToCartBtn')

// cart product
let productID

// show product when page loads
window.addEventListener('DOMContentLoaded', async () => {
  const urlID = window.location.search
  try {
    const response = await fetch(`${singleProductUrl}${urlID}`)
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json()

      const { id, fields } = product
      productID = id

      const { name, price, company, colors, image: img, description } = fields
      const image = img[0].thumbnails.large.url

      document.title = `${name.toUpperCase()} | Comfy`
      pageTitleDOM.textContent = `Home / ${name}`
      imgDOM.src = `${image}`
      titleDOM.textContent = `${name}`
      companyDOM.textContent = `by ${company}`
      priceDOM.textContent = formatPrice(price)
      descDOM.textContent = `${description}`
      colors.forEach((item) => {
        const span = document.createElement('span')
        span.classList.add('product-color')
        span.style.backgroundColor = `${item}`
        colorsDOM.append(span)
      })
    } else {
      console.log(response.status, response.statusText)
      centerDOM.innerHTML = `
       <div>
       <h3 class="error">sorry, something went wrong</h3>
       <a href="index.html" class="btn">back home</a> 
       </div> 
      `
    }
  } catch (error) {
    console.log(error)
  }

  loading.style.display = 'none'
})

cartBtn.addEventListener('click', () => {
  addToCart(productID)
})
