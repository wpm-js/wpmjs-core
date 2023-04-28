const path = require('path')
const packageJson = require('../package.json')

module.exports = {
  mode: 'production',
  entry: './src/index.umd.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `wpmjs-${packageJson.version}production.js`,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
