import { extendsSubscribe } from '../core'
import { BehaviorSubject } from 'rxjs'

extendsSubscribe('@@router', {
  subject: new BehaviorSubject(null),
  beforeNotify(...args) {
    const [subjectKey, arg, next] = args
    return { subjectKey, arg, next }
  },
  observeCreator(store) {
    if (store.router) {
      return {
        next(value) {
          if (value) {
            store?.router?.[value.subjectKey]?.call(
              store,
              value.arg,
              value.next
            )
          }
        },
      }
    }
  },
})
