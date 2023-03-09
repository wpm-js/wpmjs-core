import wpm from '@wpm-js/core'

if (window && window.wpm) {
  throw new Error(
    'window.wpm is already exists. Please check whether different versions or resources of wpm are loaded repeatedly'
  )
}
window.wpm = wpm
