
import postcss from 'rollup-plugin-postcss';
import postcssPxtorem from 'postcss-pxtorem';
import serve from 'rollup-plugin-serve';
import html from '@rollup/plugin-html';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 新增
const config = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: '[name].js',
  },
  plugins: [
    nodeResolve(), // 新增，处理node_modules依赖
    postcss({
      extract: true, // 提取CSS到单独的文件
      plugins: [
        postcssPxtorem({
          rootValue: 75, // 设计稿宽度为16px，根据设计稿来设置rootValue
          propList: ['*'], // 可以选择转换的CSS属性，'*' 表示全部转换
          selectorBlackList: ['html'], // 设置不转换的类名，避免影响html元素
        }),
      ],
    }),
    html({
      publicPath: './',
      title: 'px2rem-loader',
      template: ({ publicPath, title }) => {
          return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${title}</title>
              <link rel="stylesheet" href="${publicPath}index.css">
          </head>
          <body>
              <div id="container"></div>
              <script type="module" src="${publicPath}index.js"></script>
          </body>
          </html>
          `;
      }
    }),
    serve({
      open: true, // 是否打开浏览器
      contentBase: ['dist'], // 静态资源目录
      host: 'localhost',
      port: 8080, // 端口号
      historyApiFallback: true, // 是否开启html5 history模式
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  ],
};

export default config;
