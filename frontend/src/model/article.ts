import Node from "./node";

export default class Article extends Node {
    name: string;
    datePublished: string;
    snippet: string;
    title: string;
    url: string;

    constructor(id: string, label: string, datePublished: string, snippet: string, title: string, url: string) {
        super(id, label, undefined, false);
        this.name = label;
        this.datePublished = datePublished;
        this.snippet = snippet;
        this.title = title;
        this.url = url;
    }
}
