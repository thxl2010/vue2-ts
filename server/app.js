/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 托管静态资源
// 访问 / 会默认查找 index.html
app.use(express.static('./dist'));

app.use(
  '/boss',
  createProxyMiddleware({
    target: 'http://eduboss.lagou.com',
    changeOrigin: true,
  })
);
app.use(
  '/front',
  createProxyMiddleware({
    target: 'http://edufront.lagou.com',
    changeOrigin: true,
  })
);
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:8090',
    changeOrigin: true,
  })
);

app.listen(3000, () => {
  console.log('running on http://localhost:3000/');
});
