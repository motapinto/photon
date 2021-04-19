import Node from "./node";

export default class Country extends Node {
    name: string;

    constructor(id: number, label: string, name: string) {
        super(id, label);
        this.name = name;
    }
}
