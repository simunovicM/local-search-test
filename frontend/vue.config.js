module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/vars.scss";
        `,
      },
    },
  },
};
