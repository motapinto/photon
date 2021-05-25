export default class Link {
    id: string;
    name: string;
    source: string;
    target: string;
    label: string;

    constructor(id: string, source: string, target: string, label: string) {
        this.id = id;
        this.name = label;
        this.source = source;
        this.target = target;
        this.label = label;
    }
}
