module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config) {
    // ...add your webpack config
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: "sass-resources-loader",
          options: {
            // Or array of paths
            resources: [
              "./src/styles/index.scss",
              "./src/components/*.scss",
              "./src/utils/*.scss",
            ],
          },
        },
      ],
    });

    return config;
  },
};
