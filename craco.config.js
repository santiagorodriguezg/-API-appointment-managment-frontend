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
              '@text-selection-bg': '#1890FF',
              '@font-size-base': '15px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
