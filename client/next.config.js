module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 10000;
    return config;
  },
};
