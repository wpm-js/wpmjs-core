import { inject } from './inject'
import { create } from './store/create'
import { post, createIframe, openWin } from './postMessage'

class WPMJS {
  constructor(config) {
    this.config = config
  }
  loadJS(url) {
    const script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
  }
  loadCSS(url) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = url
    document.head.appendChild(link)
  }
  load(urlArr) {
    urlArr.forEach((url) => {
      if (/\.js$/.test(url)) {
        // 这是 JS 文件
        this.loadJS(url)
      } else if (/\.css$/.test(url)) {
        this.loadCSS(url)
        // 这是 CSS 文件
      }
    })
  }
  async import(moduleName) {
    //TODO Get the cdn address of the package corresponding to scope/name
    //need wpm-js service supporting
    //like loadModule(moduleName)
    const defaultModule = await inject(moduleName).default()
    return defaultModule
  }
  export(moduleName, module) {
    const moduleWrapper = create({
      name: moduleName,
      exports: {
        default(resolve) {
          resolve(module)
        },
      },
    })
    return moduleWrapper
  }
}
export { inject, create, post, createIframe, openWin }
export default new WPMJS({})
