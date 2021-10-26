import { combination } from '../store/combination'

export function createRouterSubscription(store) {
  if (store.router) {
    return combination.routerSubjects.subscribe({
      next(value) {
        if (value) {
          store?.router?.[value.subjectKey]?.call(store, value.arg, value.next)
        }
      },
    })
  }
}
