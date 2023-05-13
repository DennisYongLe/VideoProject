const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://10.241.29.114:15005", // 接口地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          // 转发
          "^/api": "",
        },
        secure: false,
      },
    },
  },
});
