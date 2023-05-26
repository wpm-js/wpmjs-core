window._wpm_debugger_filters = () => {
  return false
}

let wpmLoggerStore = null

if (window.localforage) {
  wpmLoggerStore = window.localforage.createInstance({
    name: 'wpmLoggerStore',
  })
}

const logStyle_1 =
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'
const logStyle_3 =
  'background:#41b883 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'

export function debugLogger(moduleName, functionKey, args, result) {
  if (!window._wpm_debugger_filters(moduleName, functionKey, args, result)) {
    if (!result) {
      console.debug(
        `%c 请求::=> ${moduleName}.${functionKey} 参数::`,
        logStyle_1,
        args
      )
    } else {
      console.debug(
        `%c 响应::=> ${moduleName}.${functionKey} 参数::`,
        logStyle_3,
        args,
        result
      )
    }
  }
}
