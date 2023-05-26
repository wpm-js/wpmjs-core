window._wpm_debugger_filters = () => {
  return false
}
const logStyle_1 =
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'
const logStyle_3 =
  'background:#41b883 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'

export function debugLogger(moduleName, functionKey, args, result) {
  if (!window._wpm_debugger_filters(moduleName, functionKey, args, result)) {
    if (!result) {
      console.debug(
        `%c 请求::=> ${moduleName}.${functionKey} 请求参数::`,
        logStyle_1,
        args.length > 0 ? [...args] : '无'
      )
    } else {
      console.debug(
        `%c 响应::=> ${moduleName}.${functionKey}`,
        logStyle_3,
        '返回结果:',
        result
      )
    }
  }
}
