module.exports = {
  env: {
    VERSION: process.env.npm_package_version,
  },
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    return config
  },
}
