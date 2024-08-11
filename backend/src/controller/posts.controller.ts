// import { Body, Controller, Inject, Post, Files} from "@midwayjs/core";
import { PostService } from "../service/post.service";
// import { Context } from '@midwayjs/koa';
import { Controller, Post, Inject, Files, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as path from 'path';
import * as fs from 'fs/promises';

@Controller('/posts')
export class PostController {

    @Inject()
    postService: PostService;
    ctx: Context;

    @Post('/upload')
  async upload(@Files() files) {
    console.log('Received files:');
    try {
      // 打印文件信息以帮助调试
      console.log('Received files:', files);

      // 根据文件数据结构检查文件
      if (!files || !Array.isArray(files) || files.length === 0) {
        return { success: false, message: 'No files received' };
      }

      const uploadedFiles = Array.isArray(files) ? files : [files];
      const urls = [];

      // 确保上传目录存在
      const uploadDir = path.join(__dirname, '../../data/images');
      await fs.mkdir(uploadDir, { recursive: true });

      for (const file of uploadedFiles) {
        if (!file || !file.data) {
          console.error('Invalid file data:', file);
          continue;
        }

        // 生成唯一文件名
        const fileName = `${Date.now()}_${file.filename}`;
        const filePath = path.join(uploadDir, fileName);

        // 移动文件到上传目录
        await fs.rename(file.data, filePath);

        // 生成文件访问的 URL
        const fileUrl = `${this.ctx.origin}/uploads/${fileName}`;
        console.log('Generated file URL:', fileUrl);
        urls.push(fileUrl);
      }

      console.log('Uploaded file URLs:', urls);
      return { success: true, urls };
    } catch (error) {
      console.error('File upload failed:', error);
      return { success: false, message: 'File upload failed', error: error.message };
    }
  }

    @Post('/create')
    async create(@Body() body) {
        const { newPostTitle, newPostContent, author, community, imageUrls} = body;
        try {

  
          const post = await this.postService.create(newPostTitle, newPostContent, author, community, imageUrls);
          if (post != null) {
            console.log("post creation succeed");
            return { success: true, message: 'OK'};
          } else {
            console.log("post name already exists");
            return { success: false, message: 'post name already exists' };
          }
        } catch (error) {
          console.error('Error during post creation:', error);
          return { success: false, message: 'post creation failed. Please try again later.' };
        }
      }

    @Post('/fetch')
    public async fetch(@Body() body) {
        const { community } = body;
        // console.log(await this.postService.fetch(community));
        return this.postService.fetch(community);
    }

    @Post('/comment')
    public async comment(@Body() body) {
        const { content, author, community, index } = body;
        // console.log(await this.postService.fetch(community));
        return { success: true, message: 'OK', data: this.postService.comment(content, author, community, index)};
    }
}