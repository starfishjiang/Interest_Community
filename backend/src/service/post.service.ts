import { Provide } from "@midwayjs/core";
import { Post } from "../model/post.model"
import { Comment } from "../model/comment.model";
import { Activation } from "../model/activation.model";
import * as fs from 'fs'
import * as path from 'path'

const COMMUNITY_FILE_PATH = path.join(__dirname, '../../data/communities.json');
const USER_FILE_PATH = path.join(__dirname, '../../data/users.json');
@Provide()
export class PostService {

    public async create(title, content, author, community, imageUrls): Promise<string |void> {
        return new Promise((resolve, reject) => {
            fs.readFile(COMMUNITY_FILE_PATH, 'utf-8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    console.error('Reading post file failed', err);
                    return reject(err);
                }
                let communities = [];
                if (!err) {
                    communities = JSON.parse(data);
                }
                const foundCommunityIndex = communities.findIndex(u => u.name === community);
                if (foundCommunityIndex === -1) {
                    console.log('Community already exists, not adding duplicate');
                    resolve(null);
                } else {
                    fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
                        if (err && err.code !== 'ENOENT') {
                            console.error('Reading user file failed', err);
                            return reject(err);
                        }
                        let users = [];
                        if (!err) {
                            users = JSON.parse(data);
                        }
                        const foundUser = users.findIndex(u => u.username === author);
                        if (foundUser === -1) {
                            console.log('User not exist');
                        } else {
                            const foundActivation = (users[foundUser].activation).findIndex(u => u.community === community);
                            if (foundActivation === -1) {
                                (users[foundUser].activation).push(new Activation(community, 5));
                            }
                            else{
                                (users[foundUser].activation)[foundActivation].number += 5;
                            }
                            fs.writeFile(USER_FILE_PATH, JSON.stringify(users, null, 2), (writeErr) => {
                                if (writeErr) {
                                    console.error('post creation failed', writeErr);
                                } else {
                                    console.log('post creation succeed');
                                }
                            });
                        }
                    });
                    (communities[foundCommunityIndex].posts).push(new Post(title, content, author, imageUrls));
                    fs.writeFile(COMMUNITY_FILE_PATH, JSON.stringify(communities, null, 2), (writeErr) => {
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

    public fetch(CommunityId): Promise<Post[] | null> {
        return new Promise((resolve, reject) => {
            fs.readFile(COMMUNITY_FILE_PATH, 'utf-8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('post file not exist');
                        return resolve(null);
                    } else {
                        
                        console.error('Reading post file failed', err);
                        return reject(err);
                    }
                }
                
                let communuitylist = JSON.parse(data);
                const foundCommunityIndex = communuitylist.findIndex(u => u.name === CommunityId);
                if (foundCommunityIndex === -1) {
                    console.log('Community not defined');
                    resolve(null);
                } else {
                resolve(communuitylist[foundCommunityIndex].posts);
                }
            });
        });
    }

    public comment(content, author, community, index): Promise<string | null> {
        return new Promise((resolve, reject) => {
            fs.readFile(COMMUNITY_FILE_PATH, 'utf-8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('post file not exist');
                        return resolve(null);
                    } else {
                        
                        console.error('Reading post file failed', err);
                        return reject(err);
                    }
                }
                
                let communuitylist = JSON.parse(data);
                const foundCommunityIndex = communuitylist.findIndex(u => u.name === community);
                if (foundCommunityIndex === -1) {
                    console.log('Community not defined');
                    resolve(null);
                } else {
                    fs.readFile(USER_FILE_PATH, 'utf-8', (err, data) => {
                        if (err && err.code !== 'ENOENT') {
                            console.error('Reading user file failed', err);
                            return reject(err);
                        }
                        let users = [];
                        if (!err) {
                            users = JSON.parse(data);
                        }
                        const foundUser = users.findIndex(u => u.username === author);
                        if (foundUser === -1) {
                            console.log('User not exist');
                        } else {
                            const foundActivation = (users[foundUser].activation).findIndex(u => u.community === community);
                            if (foundActivation === -1) {
                                (users[foundUser].activation).push(new Activation(community, 2));
                            }
                            else{
                                (users[foundUser].activation)[foundActivation].number += 2;
                            }
                            fs.writeFile(USER_FILE_PATH, JSON.stringify(users, null, 2), (writeErr) => {
                                if (writeErr) {
                                    console.error('post creation failed', writeErr);
                                } else {
                                    console.log('post creation succeed');
                                }
                            });
                        }
                    });
                    (communuitylist[foundCommunityIndex].posts[index].comments).push(new Comment(content, author));
                    fs.writeFile(COMMUNITY_FILE_PATH, JSON.stringify(communuitylist, null, 2), (writeErr) => {
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
}