### wpmjs

使用 wpmjs 可以快速将你项目中的 React 组件共享给其他的项目，而不需要依赖构建工具的支持

### 以 Vite 为例

#### 项目 A

- src/component/index.js

```js
import React from 'react'
import wpm from '@wpm-js/core'

function MyComponent() {}

wpm.export('MyComponent', MyComponent)
```

- vite.config.js

```js
/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  define: { 'process.env': {} },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/components/index.js'),
      name: 'MyComponent',
      // the proper extensions will be added
      fileName: 'MyComponent',
      formats: ['iife'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        extend: true,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react()],
})
```

- 假设打包后的访问链接 //dist/js/MyComponent.iife.js

#### 项目 B

- src/index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import wpm from '@wpm-js/core'

window.React = React
window.ReactDOM = ReactDOM // 用来给引入的组件使用

wpm.loadJS('//dist/js/MyComponent.iife.js')

const MyComponent = React.lazy(() => wpm.import('MyComponent'))

const BApp(){
  return (
    <>
      <React.Suspense fallback="loading...">
        <MyComponent/>
      </React.Suspense>
    </>
  )
}
```
