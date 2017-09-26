var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: './src/index',
  target: 'web',
  output: {
    path: path.join(__dirname + '/public'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.json$/, include: [
        /node_modules/,
       path.resolve(__dirname, '..')
     ],loader: 'json-loader' },
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},      
      {test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, loader: 'url-loader?limit=100000'}
    ]
  }
};
