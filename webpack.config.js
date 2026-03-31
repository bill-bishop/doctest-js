const path = require('path')

module.exports = {
  devtool: false,
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    filename: 'index.js',
  },
  resolve: {
    modules: [__dirname, 'node_modules', 'src'],
    extensions: ['*', '.js', '.json'],
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env']
          }
        },
        include: [path.join(__dirname, 'src')],
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
}
