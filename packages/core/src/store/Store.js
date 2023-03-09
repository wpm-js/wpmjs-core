/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable react/display-name */
import { combination } from './combination'
import { invoke } from '../subscribe/invoke'

export class Store {
  constructor(storeConfig) {
    this.exports = storeConfig.exports ? { ...storeConfig.exports } : null
    this.baseSymbol = storeConfig.baseSymbol
    this.notificationSubject = combination.$createNotificationSubject(
      storeConfig,
      this.baseSymbol
    )
    this.symbol = Symbol()
    this.name = storeConfig.name
    combination.$createSubjects(this, this.baseSymbol, this.symbol)
    combination.$setSubject(this.baseSymbol, this, storeConfig.single)
    this.invoke = invoke
  }
  dispose() {
    combination.$remove(this.symbol, this.baseSymbol)
  }
}
