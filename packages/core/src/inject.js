/* eslint-disable no-undef */
import { invoke } from './invoke'
import { mock } from './mock'
import { debugLogger } from './utils/debugger'
// This function is used to create a proxy object that intercepts function calls made on it.
// It takes in a moduleName parameter and returns a new proxy object.

export function inject(moduleName) {
  // If the browser does not support Proxy, throw an error
  if (window.Proxy === undefined) {
    throw new Error(
      `The current browser does not support Proxy, and wpm-related functions cannot be used. Check the runtime environment`
    )
  } else {
    // Create a new proxy object with a get handler that intercepts property access on the proxy object
    return new Proxy(
      {},
      {
        get: function (target, property) {
          // Create a new proxy object with an apply handler that intercepts function calls made on the proxy object.
          return new Proxy(function () {}, {
            apply: function (target, thisArg, argumentsList) {
              // Check if there is a mock function for the given module and property
              if (mock?.[moduleName]?.[property]) {
                return mock[moduleName][property](...argumentsList)
              } else {
                // If there is no mock function, log the module name, property name and arguments
                try {
                  debugLogger(moduleName, property, argumentsList, false)
                } catch (error) {
                  console.error(error)
                }
                // Invoke the function using the WPM API
                return invoke([moduleName], property, ...argumentsList)
              }
            },
          })
        },
      }
    )
  }
}
