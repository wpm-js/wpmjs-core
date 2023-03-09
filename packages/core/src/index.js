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
  import(moduleName) {
    //TODO Get the cdn address of the package corresponding to scope/name
    //need wpm-js service supporting
    //like loadModule(moduleName)
    return inject(moduleName)
  }
  export() {}
}
export default new WPMJS({})
