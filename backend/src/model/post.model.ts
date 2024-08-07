import { Comment } from './comment.model';

export class Post {

    id: number;
    name: string;
    content:string;
    author: string;
    comments: Comment[];

    constructor(name: string,content: string, author: string) {
        this.name = name;
        this.content = content;
        this.author = author;
        this.comments = [];
    }

    public getName() {
        return this.name;
    }
}