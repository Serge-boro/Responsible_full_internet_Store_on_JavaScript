import { getStorageItem, setStorageItem } from './utils.js'
let store = getStorageItem('store') //[]

const setupStore = (products) => {
  store = products.map((item) => {
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = item
    const image = img[0].thumbnails.large.url
    return { id, featured, name, price, company, colors, image }
  })
  setStorageItem('store', store)
}

const findProduct = (dataID) => {
  const product = store.find((item) => item.id === dataID)
  return product
}

export { store, setupStore, findProduct }
