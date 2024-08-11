import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as ws from '@midwayjs/ws';
import * as crossDomain from '@midwayjs/cross-domain';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as upload from '@midwayjs/upload';
import koaBody from 'koa-body';
import * as path from 'path';
import * as KoaStatic from 'koa-static';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as staticFile from '@midwayjs/static-file';
@Configuration({
  imports: [
    koa,
    ws,
    crossDomain,
    validate,
    upload,
    staticFile,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    
  ],
  importConfigs: [path.join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}

export class ContainerLifeCycle {
    @App()
    app: koa.Application;
  
    async onReady() {
      this.app.use(koaBody({
        multipart: true, 
        formidable: {
          uploadDir: path.join(__dirname, '../public/images'), 
          keepExtensions: true, 
          maxFileSize: 200 * 1024 * 1024, 
        },
      }));
      this.app.use(KoaStatic(path.join(__dirname, '../public')));
    }
  }
