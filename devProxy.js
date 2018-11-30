module.exports = {
    test: {
      '^/invoice/**': {
        target: 'http://10.142.71.239:8010/',
        hostRewrite: 'http://10.142.71.239:8010/',
        changeOrigin: true,
        secure: false,
      },
      '^/dropDown/**': {
        target: 'http://10.142.71.239:8010/',
        hostRewrite: 'http://10.142.71.239:8010/',
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
