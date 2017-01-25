var path = require("path");

module.exports = {
    node: {
      fs: "empty"
    },
  devtool: 'eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool

  entry: ["babel-polyfill", "./src/index.js"],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
          { test: /\.json$/, loader: "json" }
        ],
        noParse: [path.join(__dirname, 'node_modules/handsontable/dist/handsontable.full.js')]
    },
    resolve: {
      alias: {
        'handsontable': path.join(__dirname, 'node_modules/handsontable/dist/handsontable.full.js')
      }
    }
};
