import { Controller,  Inject, Post, Body, Get} from "@midwayjs/core";
import { CommunityService } from "../service/community.service";

@Controller("/community")
export class TaskController {

    @Inject()
    communityService: CommunityService;

    @Post('/create')
    async create(@Body() body) {
      const { name } = body;
      try {
        const community = await this.communityService.create(name);
        if (community != null) {
          console.log("community creation succeed");
          return { success: true, message: 'OK', data: community };
        } else {
          console.log("community name already exists");
          return { success: false, message: 'community name already exists' };
        }
      } catch (error) {
        console.error('Error during community creation:', error);
        return { success: false, message: 'community creation failed. Please try again later.' };
      }
    }

    @Get('/fetch')
    public async fetch() {
        return this.communityService.fetch();
    }
    
}