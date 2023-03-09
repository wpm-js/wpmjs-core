/* eslint-disable no-undef */
import { combination } from './combination'
import { createSubscriptions } from '../subscribe/createSubscriptions'
import { Store } from './Store'

function create(entity) {
  const symbol = entity.name
  entity.baseSymbol = symbol
  if (
    !combination.components[symbol] ||
    combination.components[symbol].length === 0
  ) {
    const entityStore = new Store(entity)
    combination.$register(symbol, entityStore, true)
    const { selfSubscription } = createSubscriptions(entityStore)
    const rawDispose = entityStore.dispose
    entityStore.dispose = () => {
      rawDispose.call(entityStore)
      selfSubscription?.unsubscribe()
    }
    return entityStore
  }
  return combination.components[symbol]
}

export { create }
