/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react'
import { inject, req } from '@rdeco/module'
import { createMembrane, create } from '@rdeco/core'
import { createComponent } from './createComponent'

export function Inject(props) {
  const el = React.createRef()
  let deps = []
  if (props.deps) {
    deps = props.deps.map((dep) => {
      if (Array.isArray(props[dep])) {
        return JSON.stringify(props[dep])
      } else {
        return props[dep]
      }
    })
  }
  useEffect(() => {
    inject(props.name).render(el.current, props)
  }, deps)
  return <div ref={el}></div>
}

export function InjectComponent(props) {
  const [render, setRender] = useState(false)
  let Component = useRef(() => <></>)
  useEffect(() => {
    inject(props.name)
      .getComponent()
      .then((com) => {
        Component.current = com
        setRender(true)
      })
      .catch((e) => {
        console.warn(e)
      })
  }, [])
  if (props.componentProps) {
    return (
      <>
        {render && (
          <Component.current {...props.componentProps}></Component.current>
        )}
      </>
    )
  }
  return <>{render && <Component.current {...props}></Component.current>}</>
}

export function ReqApp(props) {
  const { membrane, style, src, configName } = props
  useEffect(() => {
    if (configName) {
      inject(configName)
        .getBaseConfig()
        .then((baseConfig) => {
          installHooks(baseConfig, membrane)
        })
    }
  }, [])
  return (
    <div>
      <div style={style}>
        <iframe
          // onLoad={onIframeLoad(setDisplay)}
          style={style || {}}
          title="req-app"
          src={src}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  )
}

export function installHooks(baseConfig, membrane = {}) {
  if (window.parent && window.parent.$$rdeco_combination) {
    console.warn(`当前是被 ReqApp 集成，不再初始化默认的 hooks`)
    return
  }
  if (baseConfig.component) {
    const componentKeys = Object.keys(baseConfig.component)
    let com = null
    componentKeys.forEach((componentKey) => {
      baseConfig.component[componentKey].name = componentKey + '-comp'
      if (membrane.component && membrane.component[componentKey]) {
        com = createComponent(
          createMembrane(
            baseConfig.component[componentKey],
            membrane.component[componentKey]
          )
        )
      } else {
        com = createComponent(baseConfig.component[componentKey])
      }
      create({
        name: componentKey,
        exports: {
          getComponent(resolve) {
            resolve(com)
          },
        },
      })
    })
  }
  if (baseConfig.function) {
    const keys = Object.keys(baseConfig.function)
    keys.forEach((key) => {
      baseConfig.function[key].name = key
      if (membrane.function && membrane.function[key]) {
        create(createMembrane(baseConfig.function[key], membrane.function[key]))
      } else {
        create(baseConfig.function[key])
      }
    })
  }
}

export function ReqComponent(props) {
  const [render, setRender] = useState(false)
  const [loaded, setLoaded] = useState(false)
  let Component = useRef(() => <></>)
  const done = () => {
    if (props.done) {
      props.done()
    }
    setLoaded(true)
    setRender(true)
    return
  }
  const renderComponent = () => {
    if (props.componentProps) {
      return (
        <>
          {render && (
            <Component.current {...props.componentProps}></Component.current>
          )}
        </>
      )
    }
    return <>{render && <Component.current {...props}></Component.current>}</>
  }
  useEffect(() => {
    if (
      window.$$rdeco_combination.reactComponents &&
      window.$$rdeco_combination.reactComponents[props.name]
    ) {
      Component.current = window.$$rdeco_combination.reactComponents[props.name]
      done()
    } else {
      let remoteReqName = props.name
      if (props.autoEntry) {
        remoteReqName = `${props.name}/req-entry`
      }
      const remote = req(remoteReqName)
      remote
        .getComponent()
        .then((com) => {
          Component.current = com
          done()
        })
        .catch((e) => {
          setLoaded(true)
          console.warn(e)
        })
    }
  }, [])
  if (props.fallback) {
    if (loaded) {
      return renderComponent()
    }
    return <>{props.fallback}</>
  }
  return renderComponent()
}
