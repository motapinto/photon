import Node from "./node";

export default class Article extends Node {
    publishedAt: string;
    score: number | undefined;
    title: string;
    url: string;

    constructor(id: number, label: string, publishedAt: string, score: number | undefined, title: string, url: string) {
        super(id, label);
        this.publishedAt = publishedAt;
        this.score = score;
        this.title = title;
        this.url = url;
    }
}
