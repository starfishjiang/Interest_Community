// import { Inject, Controller, Get, Query } from '@midwayjs/core';
// import { Context } from '@midwayjs/koa';
// import { UserService } from '../service/user.service';

// @Controller('/api')
// export class APIController {
//   @Inject()
//   ctx: Context;

//   @Inject()
//   userService: UserService;

// //   @Get('/get_user')
// //   async getUser(@Query('uid') uid) {
// //     const user = await this.userService.getUser({ uid });
// //     return { success: true, message: 'OK', data: user };
// //   }

//   @Get('/login')
//   async getUser(@Query('uid') uid) {
//     const user = await this.userService.getUser({ uid });
//     return { success: true, message: 'OK', data: user };
//   }

//   @Get('/register')
//   async setUser(@Query('uid') uid) {
//     const user = await this.userService.getUser({ uid });
//     return { success: true, message: 'OK', data: user };
//   }
// }


import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body() body) {
    const { username, password } = body;
    // 实现登录逻辑，验证用户名和密码，返回用户信息或者 token
    const user = await this.userService.login(username, password);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/register')
  async register(@Body() body) {
    const { username, password } = body;
    // 实现注册逻辑，创建新用户记录
    console.log("register");
    const newUser = await this.userService.register(username, password);
    return { success: true, message: 'User registered successfully', data: newUser };
  }
}

