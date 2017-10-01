const path = require('path');

module.exports = {
  //input setup
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],

  // output setup
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  // Check for file extensions
  resolve: {
    extensions: ['.js', '.jsx']
  },

  //  setup modules to convert react and es2015
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      },
      test: /\.jsx?$/
    }]
  },

  // enable source mapping in devmode
  devtool: 'cheap-eval-source-map',

  devServer: {
    // without this below line react-router won't work
    // see more at https://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public')
  }

}
