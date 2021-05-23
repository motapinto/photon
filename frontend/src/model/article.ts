import Node from "./node";

export default class Article extends Node {
    publishedAt: string;
    score: number;
    title: string;
    url: string;

    constructor(id: string, labels: string[], publishedAt: string, score: number, title: string, url: string) {
        super(id, labels);
        this.publishedAt = publishedAt;
        this.score = score;
        this.title = title;
        this.url = url;
    }
}
