const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // debug地址
        // target: "http://10.241.29.114:15005",
        // 接口地址
        target: "http://10.241.7.235:15005",
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
