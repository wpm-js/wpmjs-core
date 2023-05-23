window._wpm_debugger_filters = () => {
  return true
}

const logStyle_1 =
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'
const logStyle_2 =
  'background:#1677ff ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'
const logStyle_3 =
  'background:#41b883 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff'

export function debugLogger(moduleName, functionKey, args, result) {
  if (!window._wpm_debugger_filters(moduleName, functionKey, args, result)) {
    console.debug('%c 请求::=> ', logStyle_1)
    console.debug(
      `%c 模块名/方法:: ${moduleName}/${functionKey} => 参数::=>`,
      logStyle_2,
      args
    )
    result && console.debug('%c 响应::=>', logStyle_3, result)
    console.debug('<-------------------->')
  }
}
