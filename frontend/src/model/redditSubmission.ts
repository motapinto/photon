import Node from "./node";

export default class RedditSubmission extends Node {
    name: string;
    author: string;
    numComments: number;
    permalink: string;
    score: number;
    subreddit: string;
    subredditSubscribers: number;
    title: string;

    constructor(id: string, label: string, author: string, numComments: number, permalink: string, score: number, subreddit: string, subredditSubscribers: number, title: string) {
        super(id, label, undefined, true);
        this.name = label;
        this.author = author;
        this.title = title;
        this.permalink = "https://www.reddit.com" + permalink;
        this.score = score;
        this.subreddit = subreddit;
        this.numComments = numComments;
        this.subredditSubscribers = subredditSubscribers;
    }
}
