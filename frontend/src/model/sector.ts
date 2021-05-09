import Node from "./node";

export default class Sector extends Node {
    name: string;
    numNews: number;

    constructor(id: number, label: string, growth: number, name: string, numNews: number) {
        super(id, label, growth);
        this.name = name;
        this.numNews = numNews;
    }
}
