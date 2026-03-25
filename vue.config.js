const { defineConfig } = require('@vue/cli-service')
// const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "crypto": false
      }
    }
  }
})
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    client: {
      webSocketURL: {
        hostname: 'localhost',
        port: 8080,
        pathname: '/ws'
      }
    },
    allowedHosts: 'all',
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://apiadministrador.upea.bo;"
    }
  },
  
  configureWebpack: {
    devtool: 'source-map'
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    headers: {
      // ✅ CSP menos estricta para desarrollo
      'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;",
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff'
    }
  }
}