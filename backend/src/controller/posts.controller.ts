import { Body, Controller, Inject, Post} from "@midwayjs/core";
import { PostService } from "../service/post.service";
// import { Context } from '@midwayjs/koa';

@Controller('/posts')
export class PostController {

    // @Post("/create")
    // public async create(@Body() form: ThreadDto){
    //     console.log(form);
    // }


    // @Post("/:threadid/comment")
    // public async comment(@Param("threadid") threadid: string) {
    //     console.log(threadid);
    // }

    @Inject()
    postService: PostService;

    @Post('/create')
    // async create(@Body() body) {
    //   const { newPostTitle, newPostContent, author, community, imagearray } = body;
    //   try {
    //     console.log(newPostTitle, newPostContent, author, community, imagearray);
    //     const post = await this.postService.create(newPostTitle, newPostContent, author, community, imagearray);
    //     if (post != null) {
    //       console.log("post creation succeed");
    //       return { success: true, message: 'OK'};
    //     } else {
    //       console.log("post name already exists");
    //       return { success: false, message: 'post name already exists' };
    //     }
    //   } catch (error) {
    //     console.error('Error during post creation:', error);
    //     return { success: false, message: 'post creation failed. Please try again later.' };
    //   }
    // }
    async create(@Body() body) {
        const { newPostTitle, newPostContent, author, community} = body;
        // const imagearray = files.imagearray; // Handle files
  
        try {
          console.log(newPostTitle, newPostContent, author, community);
  
          const post = await this.postService.create(newPostTitle, newPostContent, author, community);
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
        const { circleId } = body;
        // console.log(await this.postService.fetch(circleId));
        return this.postService.fetch(circleId);
    }
}