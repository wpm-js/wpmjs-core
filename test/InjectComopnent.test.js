/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import ReactDOM from 'react-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createComponent, create, withComponent, Inject } from '../src'
import { combination } from '../src/package/@rdeco/core'

test('React Inject Component Test', async () => {
  const Tag = createComponent({
    name: '@test/tag',
    view: {
      render() {
        return <div role="tag">tag</div>
      },
    },
  })
  create({
    name: '@test/tag-module',
    exports: {
      render([el, props, Context]) {
        ReactDOM.render(
          <Context.Provider value={{ name: 'hello' }}>
            <Tag></Tag>
          </Context.Provider>,
          el
        )
      },
    },
  })
  const Test = createComponent({
    name: '@test/com',
    view: {
      render() {
        return (
          <div>
            <Inject name="@test/tag-module"></Inject>
          </div>
        )
      },
    },
  })

  render(<Test></Test>)
  expect(screen.getByRole('tag')).toHaveTextContent('tag')
})