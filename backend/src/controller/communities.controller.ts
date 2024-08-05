import { Controller, Get, Inject, Post } from "@midwayjs/core";
import { CommunityService } from "../service/community.service";
import { Community } from "../model/community.model";

@Controller("/community")
export class TaskController {

    @Inject()
    communityService: CommunityService;

    @Post('/create')
    public async create() {
        const community: Community = new Community("Web Development", "Day 3");
        this.communityService.create(community);
    }

    @Get('/fetch')
    public async fetch() {
        return this.communityService.fetch();
    }

    
}