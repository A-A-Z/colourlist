// const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
  configureWebpack: {
    plugins: []
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/colourlist'
    : '/'
}
