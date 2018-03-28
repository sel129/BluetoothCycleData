var path = require('path');

module.exports = env => {
  return {
    entry: './src/bluetoothDataProvider.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'dist/bundle.js',
      library: 'bluetoothDataProvider',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        }
      ]
    },
    externals: {
      ws: "ws",
      noble: "noble"
    },
    stats: {
      colors: true
    },
    devtool: env.NODE_ENV === "prod" ? undefined : 'source-map'
  }
};
