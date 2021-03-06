const path = require('path')

module.exports = {
  lintOnSave: 'error',
  chainWebpack: config => {
    config.resolve.alias
      .set('%', path.resolve(__dirname, 'src/scss/modules'))
  }
}
