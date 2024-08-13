# Github地址
    https://github.com/starfishjiang/Interest_Community.git

# 运行方式
    在根目录终端下输入pm2 start ecosystem.config.js启动，然后在frontend文件夹下终端输入npm start获取前端的访问链接。
    若启动异常可使用npm run dev 分别启动前后端。

# 注意事项
    后端使用端口7001，应避免该端口被占用。
    若运行时有疑问可查看控制台或终端提示信息。


# 技术栈描述

## 后端

    1、Koa:使用了koa-body 用于处理请求体，koa-static 用于提供静态文件服务等。
    2、MidwayJS:使用了@midwayjs/decorator提供装饰器功能，@midwayjs/koa 作为Koa 的 MidwayJS 适配器，@midwayjs/static-file 用于处理静态文件等。

## 前端

    1、React:使用了React、react-dom等用于构建页面。
    2、axios:使用了axios用于发起 HTTP 请求。
    3、Vite:使用了vite、@vitejs/plugin-react等作为前端构建工具。

## 打包
    使用PM2用于自动化项目的启动停止等。