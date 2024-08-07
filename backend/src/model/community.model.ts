import { Post } from './post.model';

export class Community {

    name: string;

    posts: Post[];
    constructor(name: string) {
        this.name = name;
        this.posts = [];
    }

    public getName() {
        return this.name;
    }
}