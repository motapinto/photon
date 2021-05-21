export default class Link {
    id: string;
    source: string;
    target: string;
    type: string;

    constructor(id: string, source: string, target: string, type: string) {
        this.id = id;
        this.source = source;
        this.target = target;
        this.type = type;
    }
}
