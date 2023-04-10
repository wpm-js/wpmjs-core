/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import wpm from '@wpm-js/core'
import '@testing-library/jest-dom/extend-expect'

// <-@test/module/index.js
function sum(a, b) {
  return a + b
}
// package.json name is @test/module
/**
 * export {
 *   sum
 * }
 * transform to wpm.export => code above
 */
wpm.export('@test/module', {
  sum,
})
// ->@test/module/index.js

test('Through wpm.export a wpm module, then use wpm.import getting this module and call some api on it', async () => {
  // transformed import testModule from '@test/module'
  const testModule = await wpm.import('@test/module')
  const api = testModule.default
  const result = api.sum(1, 2)
  expect(result).toBe(3)
})
