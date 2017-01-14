var path = require("path");

module.exports = {
   "node": {
      fs: "empty"
    },
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
