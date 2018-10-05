const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8088;
const HOST = '0.0.0.0'; // Set to localhost if need be.
const URL = `http://${HOST}:${PORT}`


module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map',
  entry: [
    path.resolve(ROOT_PATH, 'client/src/index'),
    'babel-polyfill'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.module\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.woff(2)?$/,
        loader: "url-loader?mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=[path][name].[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [ path.resolve(ROOT_PATH, 'client/src'), 'node_modules' ],
    alias: {
      config: process.env.NODE_ENV === 'production' ? path.join(ROOT_PATH, 'client/src/configs/prod.js') :
              process.env.NODE_ENV === 'staging' ? path.join(ROOT_PATH, 'client/src/configs/dev.js') : path.join(ROOT_PATH, 'client/src/configs/local.js'),
    },
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? path.resolve(ROOT_PATH, 'client/dist') : path.resolve(ROOT_PATH, 'client/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: [
      path.resolve(ROOT_PATH, 'client/build'), 
      path.resolve(ROOT_PATH, 'client/images'),
      path.resolve(ROOT_PATH, 'client/config')
    ],
    historyApiFallback: true,
    hot: true,
    inline: true,
    // Constants defined above take care of logic
    // For setting host and port
    host: HOST,
    port: PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin(),
    new HtmlwebpackPlugin({
      title: 'React Redux Simple Starter',
      template: 'index.html'
    })
  ]
};
