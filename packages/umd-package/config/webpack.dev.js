const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.umd.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `dev.js`,
  },
  devtool: 'eval-source-map',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
