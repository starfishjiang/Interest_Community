import { Provide } from "@midwayjs/core";
import { Community } from "../model/community.model";
import * as fs from 'fs'
import * as path from 'path'

const USER_FILE_PATH = path.join(__dirname, '../../data/communities.json');
@Provide()
export class PostService {

    public async create(name: string): Promise<Community |void> {
        return new Promise((resolve, reject) => {
            fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    console.error('Reading community file failed', err);
                    return reject(err);
                }
                let community = [];
                if (!err) {
                    community = JSON.parse(data);
                }
                const foundCommunity = community.find((u: any) => u.name === name);
                if(foundCommunity != null) resolve(null);
                else{
                    community.push({name});
                    fs.writeFile(USER_FILE_PATH, JSON.stringify(community, null, 2), (writeErr) => {
                        if (writeErr) {
                            console.error('Community creation failed', writeErr);
                            reject(writeErr);
                        } else {
                            console.log('Community creation succeed');
                            resolve(new Community(name));
                        }
                    });
                }
            });
        });
    }

    public fetch(): Promise<Community[] | null> {
        return new Promise((resolve, reject) => {
            fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('Community file not exist');
                        return resolve(null);
                    } else {
                        console.error('Reading community file failed', err);
                        return reject(err);
                    }
                }
                let Communitylist = JSON.parse(data);
                resolve(Communitylist);

            });
        });
    }
}