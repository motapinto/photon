import Node from "./node";

export default class Sector extends Node {
    name: string;
    uri: string;

    constructor(id: string, label: string, name: string, uri: string) {
        super(id, label);
        this.name = name;
        this.uri = uri;
    }
}
