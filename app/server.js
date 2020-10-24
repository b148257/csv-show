const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const fs = require('fs');

const app = new Koa();

const staticPath = '../dist';

app.use(
  static(path.join(__dirname, staticPath), {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    gzip: true,
  }),
);

app.use(async (ctx) => {
  const files = fs.readdirSync(path.resolve(__dirname, '../dist'));
  const main = files[0];

  ctx.body = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>数据展示</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="${main}"></script>
    </body>
  </html>
  `;
});

app.listen(80, '0.0.0.0', () => {
  console.log('listing: 3000');
});
