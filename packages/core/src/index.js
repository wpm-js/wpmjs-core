import { inject } from './inject'
import { create } from './store/create'

class WPMJS {
  constructor(config) {
    this.config = config
  }
  loadJS(url) {
    const script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
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
export { inject }
export default new WPMJS({})
