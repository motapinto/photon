import Node from "./node";

export default class Sector extends Node {
    name: string;
    uri: string;
    numArticles: number;

    constructor(id: string, labels: string[], growth: number, name: string, uri: string, numArticles: number) {
        super(id, labels, growth);
        this.name = name;
        this.uri = uri;
        this.numArticles = numArticles;
    }
}
