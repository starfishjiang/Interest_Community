
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
    try {
      const user = await this.userService.login(username, password);
      if (user != null) {
        console.log("loginsuccess");
        return { success: true, message: 'OK', data: user };
      } else {
        console.log("loginfailed");
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Login failed. Please try again later.' };
    }
  }
  

  @Post('/register')
  async register(@Body() body) {
    const { username, password } = body;
    try {
      const newUser = await this.userService.register(username, password);
      if (newUser) {
        return { success: true, message: 'User registered successfully', data: newUser };
      } else {
        console.error('User already exists.');
        return { success: false, message: 'User already exists.' };
      }
    } catch (error) {
      return { success: false, message: 'Registeration failed.' };
    }
  }
  
  @Post('/activation')
  async activation() {
    // const { community } = body;
    try {
      const Users = await this.userService.activation();
      if (Users) {
        return { success: true, message: 'Get activaiton successfully', data: Users };
      } else {
        console.error('Get activation failed.');
        return { success: false, message: 'Get activation failed.' };
      }
    } catch (error) {
        console.error('Get activation failed.');
      return { success: false, message: 'Get activation failed.' };
    }
  }
}

