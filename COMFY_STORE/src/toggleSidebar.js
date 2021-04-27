import { getElement } from './utils.js'

const toogleNav = getElement('.toggle-nav'),
  sidebarOverlay = getElement('.sidebar-overlay'),
  sidebarClose = getElement('.sidebar-close')

toogleNav.addEventListener('click', () => {
  sidebarOverlay.classList.add('show')
})
sidebarClose.addEventListener('click', () => {
  sidebarOverlay.classList.remove('show')
})
