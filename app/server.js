const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

const staticPath = '../dist';

app.use(static(path.join(__dirname, staticPath)));

app.use(async (ctx) => {
  ctx.body = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>数据展示</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="main.js"></script>
    </body>
  </html>
  `;
});

app.listen(3000, '0.0.0.0', () => {
  console.log('listing: 3000');
});
