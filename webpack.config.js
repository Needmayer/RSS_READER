import webpack from 'webpack';
import path from 'path';
import HardSourceWebpackPlugin  from 'hard-source-webpack-plugin';
export default {
  debug: true,
  watch: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HardSourceWebpackPlugin({
      // Either an absolute path or relative to output.path.
      cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
      // Either an absolute path or relative to output.path. Sets webpack's
      // recordsPath if not already set.
      recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
      // Either a string value or function that returns a string value.
      configHash: function(webpackConfig) {
        // Build a string value used by HardSource to determine which cache to
        // use if [confighash] is in cacheDirectory or if the cache should be
        // replaced if [confighash] does not appear in cacheDirectory.
        //
        // node-object-hash on npm can be used to build this.
        return require('node-object-hash')({sort: false}).hash(webpackConfig);
      },
      // This field determines when to throw away the whole cache if for
      // example npm modules were updated.
      environmentHash: {
        root: process.cwd(),
        directories: ['node_modules'],
        files: ['package.json']
      },
      /*
      // `environmentHash` can also be a function. that can return a function
      // resolving to a hashed value of the dependency environment.
      environmentHash: function() {
        // Return a string or a promise resolving to a string of a hash of the 
        return new Promise(function(resolve, reject) {
          require('fs').readFile(__dirname + '/yarn.lock', function(err, src) {
            if (err) {return reject(err);}
            resolve(
              require('crypto').createHash('md5').update(src).digest('hex')
            );
          });
        });
      }*/
    })
  ],
  module: {
    loaders: [
      {test: /\.json$/, include: [
        /node_modules/,
       path.resolve(__dirname, '..')
     ],loader: 'json-loader' },
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};