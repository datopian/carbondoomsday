import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default {
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
  , resolve: {
    extensions: ['', '.js', '.jsx', '.json']
    , alias: {
      handsontable: path.join(__dirname, 'node_modules/handsontable/dist/handsontable.full.js')
    }
  }
  , node: {
    fs: 'empty'
  }
  , debug: true
  , devtool: 'eval-source-map' // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  , noInfo: true // set to false to see a list of every file being bundled.
  , entry: [
    'babel-polyfill'
    // must be first entry to properly set public path
    , 'webpack-hot-middleware/client?reload=true'
    , path.resolve(__dirname, 'src/index.jsx') // Defining path seems necessary for this to work consistently on Windows machines.
  ]
  , target: 'web' // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  , output: {
    path: path.resolve(__dirname, 'app') // Note: Physical files are only output by the production build task `npm run build`.
    , publicPath: '/'
    , filename: 'static/dpr-js/dist/bundle.js'
  }
  , plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development') // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      , __DEV__: true
    })
    , new webpack.HotModuleReplacementPlugin()
    , new webpack.NoErrorsPlugin()
    , new HtmlWebpackPlugin({
      template: 'index.html'
      , minify: {
        removeComments: true
        , collapseWhitespace: true
      }
      , inject: true
    })
  ]
  , module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] }
      , { test: /\.css$/, loaders: ['style', 'css?sourceMap', 'postcss'] }
      , { test: /\.json$/, loader: 'json' }
    ]
    , noParse: [path.join(__dirname, 'node_modules/handsontable/dist/handsontable.full.js')]
  }
  , postcss: () => [autoprefixer]
}
