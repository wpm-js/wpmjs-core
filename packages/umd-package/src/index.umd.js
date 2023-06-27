import wpm, { inject, create, post, createIframe } from '@wpm-js/core'

if (window && window.wpm) {
  throw new Error(
    'window.wpm is already exists. Please check whether different versions or resources of wpm are loaded repeatedly'
  )
}
window.wpm = wpm
window.$wpm_inject$ = inject
window.$wpm_create$ = create
window.$wpm_post$ = post
window.$wpm_createIframe$ = createIframe
