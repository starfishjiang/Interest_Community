import { MidwayConfig } from '@midwayjs/core';
import path = require('path');

export default {
  keys: '1719990379385_8994',
  koa: {
    port: 7002,
  },
  webSocket: {},
  cors: {
    origin: "*"
  },
  upload: {
    mode: 'file',
    fileSize: '10mb',
    whitelist: ['.jpg', '.jpeg', '.png', '.gif'],
    tmpdir: path.join(__dirname, '../public/images'),
    cleanTimeout: 5 * 60 * 1000, 
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/images/',
        dir: path.join(__dirname, '../../public/images'), 
      },
    },
  },
} as MidwayConfig;
