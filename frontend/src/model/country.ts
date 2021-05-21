import Node from "./node";

export default class Country extends Node {
    name: string;

    constructor(id: string, labels: string[], name: string) {
        super(id, labels);
        this.name = name;
    }
}
