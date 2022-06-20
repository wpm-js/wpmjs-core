// todo 这个改成package包形式的依赖，不直接使用源码？？？

import {
  enhanceContext,
  create,
  createMembrane,
  invoke,
  readState,
  namelist,
  configModuleLoader,
  registerModule,
  mock,
  compose,
  createCompose,
} from '@rdeco/core'
import {
  createComponent,
  createReqComponent,
  withComponent,
  useComponent,
  Fallback,
  createFallback,
  Inject,
  InjectComponent,
  registerReactContext,
  ReqComponent,
  ReqApp,
  installHooks,
} from '@rdeco/react'

import { Router, RouteView, Redirect, App } from '@rdeco/router'
import { inject, req, reqJSON, getIframeInject } from '@rdeco/module'
const rdeco = {
  enhanceContext,
  create,
  createMembrane,
  invoke,
  readState,
  namelist,
  configModuleLoader,
  createComponent,
  createReqComponent,
  withComponent,
  useComponent,
  Fallback,
  createFallback,
  Inject,
  InjectComponent,
  ReqComponent,
  ReqApp,
  installHooks,
  registerReactContext,
  Router,
  RouteView,
  Redirect,
  App,
  inject,
  getIframeInject,
  registerModule,
  req,
  reqJSON,
  mock,
  compose,
  createCompose,
}
if (window.rdeco === undefined) {
  window.rdeco = rdeco
}
export {
  enhanceContext,
  create,
  createMembrane,
  invoke,
  readState,
  namelist,
  configModuleLoader,
  createComponent,
  createReqComponent,
  withComponent,
  useComponent,
  Fallback,
  createFallback,
  Inject,
  InjectComponent,
  ReqComponent,
  ReqApp,
  installHooks,
  registerReactContext,
  Router,
  RouteView,
  Redirect,
  App,
  inject,
  registerModule,
  req,
  reqJSON,
  mock,
  compose,
  createCompose,
}
export default rdeco
