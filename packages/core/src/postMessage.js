import { customAlphabet } from 'nanoid'
import { AsyncSubject } from 'rxjs'

const nanoid = customAlphabet(
  '&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  6
)

import { inject } from './inject'

const iframeOnLoadFlag = {}
const iframeAsyncSubject = {}
const postAsyncSubject = {}

window.addEventListener('message', async (event) => {
  if (event.data.type === 'req') {
    const { module, api, id, data = {} } = event.data
    if (event.target.location.href === window.location.href) {
      const res = await inject(module)[api](data)
      event.source.postMessage({
        type: 'res',
        data: res,
        id,
      })
    }
  }
  if (event.data.type === 'res') {
    const { id, data } = event.data
    if (event.target.location.href === window.location.href) {
      postAsyncSubject[id].next(data)
      postAsyncSubject[id].complete()
      postAsyncSubject[id] = null
    }
  }
})

export function createIframe({ domId, src }) {
  const iframe = document.createElement('iframe')
  iframeOnLoadFlag[domId] = false
  iframeAsyncSubject[domId] = new AsyncSubject()
  iframe.id = domId
  iframe.src = src
  iframe.frameborder = '0'
  iframe.onload = () => {
    iframeOnLoadFlag[domId] = true
    iframeAsyncSubject[domId].complete()
  }
  document.body.appendChild(iframe)
}

export const post = (url, { data }) => {
  const [domId, module, api] = url.split('/')
  const id = nanoid()
  postAsyncSubject[id] = new AsyncSubject()
  const payload = {
    module,
    api,
    data,
    type: 'req',
    id,
  }
  if (domId === 'top') {
    top.postMessage(payload, top.origin)
  } else {
    // 只匹配窗口为主窗口时候的逻辑
    const target = document.getElementById(domId)
    if (target === null) {
      throw new Error(`${domId} is not exist`)
    }
    if (iframeOnLoadFlag[domId]) {
      target.contentWindow.postMessage(payload, target.contentWindow.origin)
    } else {
      iframeAsyncSubject[domId].subscribe({
        next({ payload, origin }) {
          target.contentWindow.postMessage(payload, origin)
        },
      })
      iframeAsyncSubject[domId].next({
        payload,
        origin: target.contentWindow.origin,
      })
    }
  }
  return new window.Promise((resolve) => {
    postAsyncSubject[id].subscribe({
      next(res) {
        resolve(res)
      },
    })
  })
}
