import { Provide } from "@midwayjs/core";
import { Community } from "../model/community.model";
import * as fs from 'fs'
import * as path from 'path'

const USER_FILE_PATH = path.join(__dirname, '../../data/commmunities.json');
@Provide()
export class CommunityService {

    public async create(task: Task) {

        fs.writeFile(path.join("D:", "task.json"), JSON.stringify(task), () => {
            console.log("写入成功");
        })
    }

    public async register(name: string): Promise<Community |void> {
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


    public fetch(): Task {
        const data = JSON.parse(fs.readFileSync(path.join("D:", "task.json"), 'utf-8'));
        return new Task(data["name"], data["description"], data["creatAt"]);
    }
}