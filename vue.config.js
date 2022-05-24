const { defineConfig } = require("@vue/cli-service");
const path = require('path');
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        'THREE': require.resolve('three')
      })
    ]
  }
});
