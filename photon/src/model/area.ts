import Node from "./node";

export default class Area extends Node {
    growth: number;
    name: string;
    numNews: number;

    constructor(id: number, label: string, growth: number, name: string, numNews: number) {
        super(id, label);
        this.growth = growth;
        this.name = name;
        this.numNews = numNews;
    }
}
