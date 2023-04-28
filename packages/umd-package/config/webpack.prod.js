const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.umd.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `prod.js`,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
