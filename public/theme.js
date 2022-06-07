;(function initTheme() {
  var theme = localStorage.getItem('theme') || 'light'
  document.querySelector('html').classList.add(theme)
})()
