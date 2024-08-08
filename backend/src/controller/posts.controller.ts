import { Body, Controller, Inject, Post, Get} from "@midwayjs/core";
import { PostService } from "../service/post.service";

@Controller('/posts')
export class ThreadController {

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
    async create(@Body() body) {
      const { title, content, author, community, imagearray } = body;
      try {
        const post = await this.postService.create(title, content, author, community, imagearray);
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

    @Get('/fetch')
    public async fetch() {
        // return this.postService.fetch();
    }
}