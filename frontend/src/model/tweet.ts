import Node from "./node";

export default class Tweet extends Node {
    name: string;
    authorId: string;
    createdAt: string;
    likeCount: number;
    quoteCount: number;
    replyCount: number;
    retweetCount: number;
    text: string;

    constructor(id: string, label: string, authorId: string, createdAt: string, likeCount: number, quoteCount: number, replyCount: number, retweetCount: number, text: string) {
        super(id, label, undefined, true);
        this.name = label;
        this.authorId = authorId;
        this.createdAt = createdAt;
        this.likeCount = likeCount;
        this.quoteCount = quoteCount;
        this.replyCount = replyCount;
        this.retweetCount = retweetCount;
        this.text = text;
    }
}
