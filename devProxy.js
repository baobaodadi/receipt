module.exports = {
    test: {
      '^/asset/**': {
        target: 'http://10.129.204.69:8090/',
        hostRewrite: 'http://10.129.204.69:8090/',
        changeOrigin: true,
        secure: false,
      },
      '^/category/**': {
        target: 'http://10.129.204.69:8090/',
        hostRewrite: 'http://10.129.204.69:8090/',
        changeOrigin: true,
        secure: false,
      },
      '^/pub/**': {
        target: 'http://10.129.204.69:8090/',
        hostRewrite: 'http://10.129.204.69:8090/',
        changeOrigin: true,
        secure: false,
      },
      '^/suite/**': {
        target: 'http://10.129.204.69:8090/',
        hostRewrite: 'http://10.129.204.69:8090/',
        changeOrigin: true,
        secure: false,
      },
      '^/oss/**': {
        target: 'http://test.asset.sogou:90/',
        hostRewrite: 'http://test.asset.sogou:90/',
        changeOrigin: true,
        secure: false,
      },

    },
//   // prod: {
//   //   '/api/v1/exceptionData/**': {
//   //     target: 'http://10.129.204.157',
//   //     secure: false,
//   //   },
//   // }
};
