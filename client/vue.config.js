const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return options.compilerOptions = {
          ...options.compilerOptions,
          isCustomElement: tag => tag.startsWith('navigation-')
        }
      })
  },
  runtimeCompiler: true,
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
        },
      },
    },
  },
})
