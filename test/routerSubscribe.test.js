/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { createComponent, notify } from '../src/index'
import { combination } from '../src/package/@rdeco/core/src'
import '@testing-library/jest-dom/extend-expect'

test('测试 router 响应内部 notify', async () => {
  notify('@@router', 'before', {
    to: 'home,',
    from: 'index',
    done: () => {
      console.debug('done')
      notify('@@router', 'after', { route: { name: 'home', path: '/home' } })
    },
  }).then((done) => {
    done && done()
  })

  const Test = createComponent({
    name: '@test/com1',
    state: {
      page: 'no router',
    },
    router: {
      before({ to, from, done }, next) {
        next(done)
      },
      after(value) {
        console.debug(value)
        expect(value).toStrictEqual({
          route: { name: 'home', path: '/home' },
        })
        this.setter.page('home')
      },
    },
    view: {
      render() {
        return (
          <div role="page">
            <button role="click" /> {this.state.page}
          </div>
        )
      },
    },
  })

  render(<Test></Test>)
  fireEvent.click(screen.getByRole('click'))
  await waitFor(() => {
    expect(screen.getByRole('page')).toHaveTextContent('home')
  })
})
