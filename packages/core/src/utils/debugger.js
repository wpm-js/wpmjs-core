window._wpm_debugger_filters = () => {
  return false
}
const logStyle_start =
  'background:#1677ff ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'
const logStyle_mid =
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'
const logStyle_end =
  'background:#1677ff ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'

window._wpm_debugger_logStore = []
let cacheLogQueue = []
export function debugLogger(moduleName, functionKey, args, result) {
  if (!window._wpm_debugger_filters(moduleName, functionKey, args, result)) {
    const logStore = window._wpm_debugger_logStore
    if (!result) {
      cacheLogQueue.push([
        `${moduleName}.${functionKey}`,
        `%c REQ::${moduleName}.${functionKey}() params:`,
        logStyle_mid,
        args.length > 0 ? [...args] : '无',
        `reqTime::`,
        new Date().toLocaleString(),
      ])
      // console.groupCollapsed(`${moduleName}.${functionKey}`)

      // console.debug(
      //   `%c 请求::=> ${moduleName}.${functionKey} 请求参数::`,
      //   logStyle_1,
      //   args.length > 0 ? [...args] : '无'
      // )
      logStore.push({
        request: {
          moduleName,
          functionKey,
          args,
          time: new Date().toLocaleString(),
        },
      })
    } else {
      cacheLogQueue.push([
        `${moduleName}.${functionKey}`,
        `%c RES::${moduleName}.${functionKey} =>`,
        logStyle_end,
        result,
        'resTime::',
        new Date().toLocaleString(),
      ])
      const responseKey = `${moduleName}.${functionKey}`
      const requestIndex = cacheLogQueue.findIndex(
        (log) => log[0] === responseKey
      )
      const printQueue = cacheLogQueue.splice(requestIndex)
      printQueue.forEach((p, i, arr) => {
        const label = p.shift()
        if (i === 0) {
          console.groupCollapsed(label)
          p[1] = logStyle_start
        }
        console.debug(...p)
        if (i === arr.length - 1) {
          console.groupEnd(label)
        }
      })
      // console.groupEnd(`${moduleName}.${functionKey}`)
      logStore.push({
        response: {
          moduleName,
          functionKey,
          args,
          time: new Date().toLocaleString(),
        },
      })
    }
  }
}
