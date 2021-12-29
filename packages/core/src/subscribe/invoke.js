/* eslint-disable no-undef */
import { AsyncSubject } from 'rxjs'
import { combination } from '../store/combination'

export const invoke = (...args) => {
  const syncker = new AsyncSubject(null)
  const next = (value) => {
    syncker.next(value)
    syncker.complete()
  }
  const infrom = (targetMeta, fnKey, data, next) => {
    if (!Array.isArray(targetMeta)) {
      throw new Error(`${targetMeta} 不是一个数组`)
    }
    const [target, finder] = targetMeta
    const value = {
      type: 'invoke',
      targetMeta,
      fnKey,
      data,
    }
    combination.pluginSubject.next(value)
    if (combination.notificationSubjects[target]) {
      combination.notificationSubjects[target].next({
        fnKey,
        data,
        next,
        finder,
      })
    } else {
      combination.$createNotificationSubject({ exports: true }, target).next({
        fnKey,
        data,
        next,
        finder,
      })
    }
  }
  if (/^@@/.test(args[0])) {
    const { beforeNotify, subject } = combination.extends[args[0]]
    subject.next(beforeNotify(args[1], args[2], next))
  } else {
    infrom(...args, next)
  }
  return new Promise((resolve, reject) => {
    const [targetMeta, fnKey] = args
    syncker.subscribe({
      next(value) {
        if (value instanceof Error) {
          const info = {
            type: 'invokeError',
            targetMeta,
            fnKey,
            error: value,
          }
          combination.pluginSubject.next(info)
          reject(value)
        } else {
          const info = {
            type: 'invokeSucess',
            targetMeta,
            fnKey,
            result: value,
          }
          combination.pluginSubject.next(info)
          resolve(value)
        }
      },
    })
  })
}
