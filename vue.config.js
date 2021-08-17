const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// Generate pages object
const pagesObj = {};

// 自定义页面 注入
const chromeName = ["popup", "options", "main"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

const plugins =
  process.env.NODE_ENV === "production"
    ? [
        {
          from: path.resolve("src/manifest.production.json"),
          to: `${path.resolve("dist")}/manifest.json`
        },
        {
          from: path.resolve("src/jsext"),
          to: `./js`
        }
      ]
    : [
        {
          from: path.resolve("src/manifest.development.json"),
          to: `${path.resolve("dist")}/manifest.json`
        },
        // 拷贝 jsExt 下面的 自定义js 文件 不做压缩 便于调试
        {
          from: path.resolve("src/jsext"),
          to: `./js`
        },
        // 拷贝 插件图标 
        {
          from: path.resolve("src/assets/img"),
          to: `./img`
        }
      ];


module.exports = {
  pages: pagesObj,
  configureWebpack: {
    entry:{
      "background": './src/jsext/background.js',
      "content": './src/jsext/content.js',
      "message": './src/jsext/message.js'
    },
    output:{
        filename: 'js/[name].js' 
    },
    plugins: [CopyWebpackPlugin(plugins)]
  }
};
