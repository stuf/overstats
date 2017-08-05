import path from 'path';
import webpack from 'webpack';

const ROOT = path.resolve(__dirname, '..', '..');
const BUILD_DIR = path.join(ROOT, 'build');
const SRC_DIR = path.join(ROOT, 'src');

export default {
  entry: {
    app: ['./src/index.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    modules: [
      path.join(ROOT, 'src'),
      'node_modules'
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ]
};
