import { BehaviorSubject, ReplaySubject } from 'rxjs'
import packageJSON from '../../package.json'

let combination = {
  version: packageJSON.version,
  components: {},
  notificationSubjects: {},
  registerSubject: new BehaviorSubject(null),
  // eslint-disable-next-line no-undef
  namelist: new Set(),
  // eslint-disable-next-line no-undef
  observableList: new Set(),
  subjects: {
    deps: {},
    targets: {},
    targetsProxy: {},
    targetsProxyQueue: {},
  },
  extends: {},
  // eslint-disable-next-line no-undef
  $initTargetProxy(baseSymbol) {
    if (!this.subjects.targetsProxy[baseSymbol]) {
      this.subjects.targetsProxy[baseSymbol] = new BehaviorSubject(null)
      this.subjects.targetsProxyQueue[baseSymbol] = []
    }
  },
  $setSubject(baseSymbol, store, isSingle = false) {
    if (isSingle) {
      if (!this.subjects.targets[baseSymbol]) {
        this.subjects.targets[baseSymbol] = [store]
      }
      this.$initTargetProxy(baseSymbol)
      this.subjects.targetsProxyQueue[baseSymbol] = [store]
      this.subjects.targetsProxy[baseSymbol].next(
        this.subjects.targetsProxyQueue[baseSymbol]
      )
    } else {
      if (!this.subjects.targets[baseSymbol]) {
        this.subjects.targets[baseSymbol] = []
      }
      this.$initTargetProxy(baseSymbol)
      this.subjects.targets[baseSymbol].push(store)
      this.subjects.targetsProxyQueue[baseSymbol].push(store)
      this.subjects.targetsProxy[baseSymbol].next(
        this.subjects.targetsProxyQueue[baseSymbol]
      )
    }
  },
  $remove(symbol, baseSymbol) {
    if (this.notificationSubjects[baseSymbol]) {
      if (this.notificationSubjects[baseSymbol]._events) {
        this.notificationSubjects[baseSymbol]._events.length = 0
      }
      if (this.notificationSubjects[baseSymbol]._buffer) {
        this.notificationSubjects[baseSymbol]._buffer.length = 0
      }
    }
    const rawLength = this.components[baseSymbol]
    this.components[baseSymbol] = this.components[baseSymbol].filter(
      (component) => {
        if (component.symbol) {
          return component.symbol !== symbol
        }
        return component.instance.symbol !== symbol
      }
    )
    if (this.components[baseSymbol].length > rawLength) {
      throw new Error(`${baseSymbol} component uninstall error`)
    }
    const rawTargetsLength = this.subjects.targets[baseSymbol]
    this.subjects.targets[baseSymbol] = this.subjects.targets[
      baseSymbol
    ].filter((target) => {
      return target.symbol !== symbol
    })
    if (this.subjects.targets[baseSymbol].length > rawTargetsLength) {
      throw new Error(`${baseSymbol} component listener uninstall error`)
    }
    const rawTargetsQueueLength = this.subjects.targetsProxyQueue[baseSymbol]
    this.subjects.targetsProxyQueue[baseSymbol] =
      this.subjects.targetsProxyQueue[baseSymbol].filter((target) => {
        return target.symbol !== symbol
      })
    if (
      this.subjects.targetsProxyQueue[baseSymbol].length > rawTargetsQueueLength
    ) {
      throw new Error(`${baseSymbol} component listener uninstall error`)
    }
    if (this.subjects.targetsProxyQueue[baseSymbol].length === 0) {
      this.subjects.targetsProxy[baseSymbol].next(null)
    }
  },
  $createNotificationSubject({ exports }, baseSymbol) {
    if (exports) {
      const notificationSubject = new ReplaySubject()
      if (!this.notificationSubjects[baseSymbol]) {
        this.notificationSubjects[baseSymbol] = notificationSubject
      }
    }
    return this.notificationSubjects[baseSymbol]
  },
  $createSubjects({ subscriber }, baseSymbol) {
    if (baseSymbol === undefined) {
      throw new Error('baseSymbol is undefined!!')
    }
    if (subscriber) {
      if (!this.subjects.deps[baseSymbol]) {
        // eslint-disable-next-line no-undef
        this.subjects.deps[baseSymbol] = new Set()
      }
      Object.keys(subscriber).forEach((observeTargetKey) => {
        this.subjects.deps[baseSymbol].add(observeTargetKey)
        this.observableList.add(observeTargetKey)
        this.$initTargetProxy(observeTargetKey)
      })
    }
    return null
  },
  $register(baseSymbol, instance, isSingle = false) {
    if (isSingle) {
      if (!this.components[baseSymbol]) {
        this.components[baseSymbol] = [{ instance }]
        this.namelist.add(baseSymbol)
      }
    } else {
      if (!this.components[baseSymbol]) {
        this.components[baseSymbol] = []
        this.namelist.add(baseSymbol)
      }
      this.components[baseSymbol].push({
        instance,
      })
      this.registerSubject.next({
        baseSymbol,
        instance,
      })
    }
  },
}

export { combination }
