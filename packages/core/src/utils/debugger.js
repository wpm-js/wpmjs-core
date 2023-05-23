window._wpm_debugger_filters = () => {
  return true
}

export function debugLogger(moduleName, functionKey, args, result) {
  if (!window._wpm_debugger_filters(moduleName, functionKey, args, result)) {
    console.debug(
      '请求::=>',
      `'模块名/方法:'${moduleName}/${functionKey}`,
      '参数::=>',
      args
    )
    result && console.debug('响应::=>', result)
    console.debug('<-------------------->')
  }
}
