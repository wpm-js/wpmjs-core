/* eslint-disable no-undef */
import { combination } from './combination'
import { createSubscriptions } from '../subscribe/createSubscriptions'
import { Store } from './Store'

function create(entity) {
  const symbol = entity.name // Get the name of the entity object
  entity.baseSymbol = symbol // Set the base name of the entity object
  if (
    !combination.components[symbol] || // If there is no value in the combination module with this name as the key
    combination.components[symbol].length === 0 // Or the length of the value is 0
  ) {
    const entityStore = new Store(entity) // Create a new Store object and pass in the entity object
    combination.$register(symbol, entityStore, true) // Register the entity in the combination module
    const { selfSubscription } = createSubscriptions(entityStore) // Create subscriptions for the entity object
    const rawDispose = entityStore.dispose // Get the dispose method of the entity object
    entityStore.dispose = () => {
      // Override the dispose method of the entity object
      rawDispose.call(entityStore) // Call the original dispose method of the entity object
      selfSubscription?.unsubscribe() // Unsubscribe the entity object
    }
    return entityStore // Return the newly created Store object for the entity
  }
  return combination.components[symbol] // Return the entity object in the combination module with this name as the key
}

export { create }
