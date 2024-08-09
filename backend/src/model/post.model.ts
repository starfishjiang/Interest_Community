import { Comment } from './comment.model';

export class Post {

    title: string;
    content:string;
    author: string;
    images: string[];
    comments: Comment[];

    constructor(title: string,content: string, author: string, images: string[]) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.images = images || [];
        this.comments = [];
    }

    public gettitle() {
        return this.title;
    }
}