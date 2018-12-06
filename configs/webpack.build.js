const paths = require('./paths');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: paths.libIndex,
  output: {
    path: paths.libOut,
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components|build)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: paths.buildTsconfig
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: 'ma-[path]__[local]'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.join(paths.rootPath, 'src/style')]
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
      },
      {
        test: /\.woff/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  externals: {
    'lodash': 'umd lodash',
    'move-js': 'umd move-js',
    'promise': 'umd promise',
    'rc-animate': 'umd rc-animate',
    'rc-trigger': 'umd rc-trigger',
    'react': 'umd react',
    'react-dom': 'umd react-dom',
    'velocity-animate': 'umd velocity-animate',
  },
  devtool: 'source-map'
};

