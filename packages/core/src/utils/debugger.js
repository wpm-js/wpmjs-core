const REQStyle = `background: #1677ff; color: #fff;`
const RESStyle = `background: green; color: #fff;`

export function debugLogger(moduleName, functionKey, args, result) {
  if (!result) {
    console.debug(
      `%c WPMRawLogREQ: ${moduleName}.${functionKey}`,
      REQStyle,
      `ARGS:`,
      args
    )
  } else {
    console.debug(
      `%c WPMRawLogRES: ${moduleName}.${functionKey}`,
      RESStyle,
      'RESULT:',
      result
    )
  }
}
