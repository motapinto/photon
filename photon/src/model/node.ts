export default class Node {
    id: number;
    label: string;
    publishedAt: string;
    score?: number;
    title: string;
    url: string;

    constructor(id: number, label: string, publishedAt: string, score = 0, title: string, url: string) {
        this.id = id;
        this.label = label;
        this.publishedAt = publishedAt;
        this.score = score;
        this.title = title;
        this.url = url;
    }
}
