
import { PostService } from "../service/post.service";
import { Controller, Post, Inject, Files, Body} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as path from 'path';
import * as fs from 'fs/promises';

@Controller('/posts')
export class PostController {
    @Inject()
    postService: PostService;
    @Inject()
    ctx: Context;

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

      @Post('/upload')
      async upload(@Files() files) {
        try {
        //   console.log('Received files:', this.ctx, files);
    
          if (!files || !Array.isArray(files) || files.length === 0) {
            return { success: false, message: 'No files received' };
          }
    
          const uploadedFiles = Array.isArray(files) ? files : [files];
          const urls = [];
          const uploadDir = path.join(__dirname, '../../public/images');
          await fs.mkdir(uploadDir, { recursive: true });
    
          for (const file of uploadedFiles) {
            if (!file || !file.data) {
              console.error('Invalid file data:', file);
              continue;
            }
            const fileName = `${Date.now()}_${file.filename}`;
            const filePath = path.join(uploadDir, fileName);
    
            await fs.copyFile(file.data, filePath);
            await fs.unlink(file.data); 
    
            const fileUrl = `${this.ctx.origin}/images/${fileName}`;
            urls.push(fileUrl);
          }
    
          return { success: true, urls };
        } catch (error) {
          console.error('File upload failed:', error);
          return { success: false, message: 'File upload failed', error: error.message };
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