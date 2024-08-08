import { Provide } from "@midwayjs/core";
import { Post } from "../model/post.model"
import * as fs from 'fs'
import * as path from 'path'

const USER_FILE_PATH = path.join(__dirname, '../../data/communities.json');
@Provide()
export class PostService {

    public async create(title, content, author, community, imagearray): Promise<string |void> {
        return new Promise((resolve, reject) => {
            fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    console.error('Reading post file failed', err);
                    return reject(err);
                }
                let communities = [];
                if (!err) {
                    communities = JSON.parse(data);
                }
                const foundCommunityIndex = communities.findIndex(u => u.name === community);
                if (foundCommunityIndex !== -1) {
                    console.log('Community already exists, not adding duplicate');
                    resolve(null);
                } else {
                    communities[foundCommunityIndex].posts.push(new Post(title, content, author, imagearray));
                    fs.writeFile(USER_FILE_PATH, JSON.stringify(communities, null, 2), (writeErr) => {
                        if (writeErr) {
                            console.error('post creation failed', writeErr);
                            reject(writeErr);
                        } else {
                            console.log('post creation succeed');
                            resolve("ok");
                        }
                    });
                }
            });
        });
    }

    // public fetch(): Promise<post[] | null> {
    //     return new Promise((resolve, reject) => {
    //         fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
    //             if (err) {
    //                 if (err.code === 'ENOENT') {
    //                     console.log('post file not exist');
    //                     return resolve(null);
    //                 } else {
    //                     console.error('Reading post file failed', err);
    //                     return reject(err);
    //                 }
    //             }
    //             let postlist = JSON.parse(data);
    //             resolve(postlist);

    //         });
    //     });
    // }
}