const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#9d429f',
              '@link-color': '#0d6efd',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
