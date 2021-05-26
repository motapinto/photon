import Node from "./node";

export default class RedditComment extends Node {
    name: string;
    author: string;
    body: string;
    permalink: string;
    score: number;
    subreddit: string;

    constructor(id: string, label: string, author: string, body: string, permalink: string, score: number, subreddit: string) {
        super(id, label, undefined, false);
        this.name = label;
        this.author = author;
        this.body = body;
        this.permalink = "https://www.reddit.com" + permalink;
        this.score = score;
        this.subreddit = subreddit;
    }
}
