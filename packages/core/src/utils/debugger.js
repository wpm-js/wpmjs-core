export function debugLogger(moduleName, functionKey, args, result) {
  if (!result) {
    console.debug(`WPMRawLogREQ: ${moduleName}.${functionKey}, ARGS:`, args)
  } else {
    console.debug(`WPMRawLogRES: ${moduleName}.${functionKey}, ARGS:`, args)
  }
}
