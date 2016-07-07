var _ = require('lodash');
var webpack = require('webpack');

module.exports = {
  entry: {
    front: [ __dirname + "/front/entry.js" ]
  },
  output: {
    path: __dirname + "/static",
    publicPath: '/static/',
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].bundle.map"
  },
  resolve: {
    root: __dirname + "/front"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=image/svg+xml"
      }
    ]
  }, plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      _: "lodash"
    })
  ]
};