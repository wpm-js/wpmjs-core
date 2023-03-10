/* eslint-disable no-undef */
import { AsyncSubject } from 'rxjs'
import { combination } from './store/combination'
const inform = (targetMeta, fnKey, data, next, error, pending) => {
  if (!Array.isArray(targetMeta)) {
    throw new Error(`${targetMeta} 不是一个数组`)
  }
  const [target, finder] = targetMeta
  if (combination.notificationSubjects[target]) {
    combination.notificationSubjects[target].next({
      fnKey,
      data,
      next,
      error,
      pending,
      finder,
    })
  } else {
    combination.$createNotificationSubject({ exports: true }, target).next({
      fnKey,
      data,
      next,
      error,
      pending,
      finder,
    })
  }
}
export const invoke = (...args) => {
  const syncker = new AsyncSubject(null)
  const next = (value) => {
    syncker.next(value)
    syncker.complete()
  }
  const error = (err) => {
    syncker.error(err)
  }
  inform(...args, next, error, pending)
  const promise = new Promise((resolve, reject) => {
    syncker.subscribe({
      next(value) {
        resolve(value)
      },
      error(e) {
        reject(e)
      },
    })
  })
  return promise
}
