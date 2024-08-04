import { Provide } from "@midwayjs/core";
import { User } from "../model/user.model";
import * as fs from 'fs';
import * as path from 'path';

const USER_FILE_PATH = path.join(__dirname, '../../data/users.json');

@Provide()
export class UserService {

    public async register(username: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            // 读取现有的用户数据
            fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    console.error('读取用户文件失败:', err);
                    return reject(err);
                }
                

                let users = [];
                if (!err) {
                    // 解析现有的用户数据
                    // console.log("1"+data+"1");
                    users = JSON.parse(data);
                    // console.log("test2");
                }
                

                users.push({ username, password, activation : 0});

                // 写入更新后的用户数据到文件
                fs.writeFile(USER_FILE_PATH, JSON.stringify(users, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error('写入用户文件失败:', writeErr);
                        reject(writeErr);
                    } else {
                        console.log('用户注册成功');
                        resolve();
                    }
                });
            });
        });
    }

    public async login(username: string, password: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            // 读取用户数据文件
            fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('用户文件不存在，可能是第一次创建');
                        return resolve(null);
                    } else {
                        console.error('读取用户文件失败:', err);
                        return reject(err);
                    }
                }

                // 解析用户数据
                let users = JSON.parse(data);

                // 查找匹配用户名的用户
                const foundUser = users.find((u: any) => u.username === username);

                if (foundUser && foundUser.password === password) {
                    // 密码验证成功，返回找到的用户对象
                    resolve(new User(foundUser.username, foundUser.password));
                } else {
                    // 密码验证失败或者用户不存在
                    resolve(null);
                }
            });
        });
    }
}



