/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    rootDir: __dirname,
  },
  publicRuntimeConfig: {},
  productionBrowserSourceMaps: true,
  generateBuildId: async () => {
    const revision = require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim();

    return revision;
  },
};
