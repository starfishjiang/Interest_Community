import { Provide } from "@midwayjs/core";
import { User } from "../model/user.model";
import * as fs from 'fs';
import * as path from 'path';

const USER_FILE_PATH = path.join(__dirname, '../../data/users.json');

@Provide()
export class UserService {

    public async register(username: string, password: string): Promise<User |void> {
        return new Promise((resolve, reject) => {
            fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    console.error('读取用户文件失败:', err);
                    return reject(err);
                }
                let users = [];
                if (!err) {
                    users = JSON.parse(data);
                }
                const foundUser = users.find((u: any) => u.username === username);
                if(foundUser != null) resolve(null);
                else{
                    users.push({ username, password, activation : 0});
                    fs.writeFile(USER_FILE_PATH, JSON.stringify(users, null, 2), (writeErr) => {
                        if (writeErr) {
                            console.error('写入用户文件失败:', writeErr);
                            reject(writeErr);
                        } else {
                            console.log('用户注册成功');
                            resolve(new User(username, password));
                        }
                    });
                }
            });
        });
    }

    public async login(username: string, password: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
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
                let users = JSON.parse(data);
                const foundUser = users.find((u: any) => u.username === username);

                if (foundUser && foundUser.password === password) {

                    resolve(new User(foundUser.username, foundUser.password));
                } else {
                    // console.log("usernotfound");
                    resolve(null);
                }
            });
        });
    }

    public async activation(community: string): Promise<any | null> {
        return new Promise((resolve, reject) => {
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
                let users = JSON.parse(data);
                // console.log(users)
                resolve(users);
                
            });
        });
    }
}



