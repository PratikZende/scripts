const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { options } = require('./options');

const tsConfigPath = path.resolve(options.tsConfig);
const jsConfigPath = path.resolve(options.jsConfig);
let jsTsConfigPath = null;
if (fs.existsSync(tsConfigPath)) {
  jsTsConfigPath = tsConfigPath;
} else if (fs.existsSync(jsConfigPath)) {
  jsTsConfigPath = jsConfigPath;
}

/** @type {string[]} List of file extensions that webpack will resolve */
const allowedExtensions = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.png',
  '.glb',
  '.fbx',
  '.obj',
  '.gltf',
  '.jpg',
  '.mp3',
  '.ogg',
  '.wav',
  '.svg',
  '.css',
  '.scss',
  '.gif',
  '.mp4'
];

/** @type {import('webpack').Configuration} Base webpack configuration used by both development and build configs */
const webpackConfig = {
  entry: path.resolve('src/index'),

  resolve: {
    extensions: allowedExtensions,
    alias: {
      assets: path.resolve('assets')
    },
    plugins: jsTsConfigPath
      ? [
          new TsconfigPathsPlugin({
            configFile: jsTsConfigPath,
            extensions: allowedExtensions
          })
        ]
      : []
  },

  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve('dist')
  },

  plugins: [
    new webpack.ProvidePlugin({
      h: ['@smoud/vdom', 'h'],
      frag: ['@smoud/vdom', 'frag']
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(options['staticDir']),
          noErrorOnMissing: true,
          globOptions: {
            dot: true,
            gitignore: true
          }
        }
      ]
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },

      // {
      //   test: /\.(gltf)$/,
      //   loader: path.join(__dirname, 'loaders/gltf-loader.js')
      // },
      {
        test: /\.ts?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015'
        },
        exclude: /node_modules/
      },

      // HTML
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },

      // JS
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // CSS
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource' //use: ['file-loader']
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'assets/images/'
            }
          }
        ]
      },

      // Models
      {
        test: /\.(glb|gltf|fbx|obj)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'assets/models/'
            }
          }
        ]
      },

      {
        test: /\.(CUBE)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'assets/models/'
            }
          }
        ]
      },

      // MP3
      {
        test: /\.(mp3|ogg|wav)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'assets/audios/'
            }
          }
        ]
      },

      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader']
      }
    ]
  }
};

exports.allowedExtensions = allowedExtensions;
exports.webpackCommonConfig = webpackConfig;
