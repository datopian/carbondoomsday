var path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
        noParse: [path.join(__dirname, 'node_modules/handsontable/dist/handsontable.full.js')]
    },
    resolve: {
      alias: {
        'handsontable': path.join(__dirname, 'node_modules/handsontable/dist/handsontable.full.js')
      }
    }
};
