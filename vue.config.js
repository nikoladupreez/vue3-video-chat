module.exports = {
    devServer: {
        https: true
    },
    css: {
        loaderOptions: {
          sass: {
              additionalData: `@import "@/assets/styles/index.scss";`,
          },
        },
    }
};
