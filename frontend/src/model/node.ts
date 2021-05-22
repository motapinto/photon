export default class Node {
    id: string;
    label: string;
    val?: number;

    constructor(id: string, label: string, val: number = 4) {
        this.id = id;
        this.label = label;
        this.val = val * (val/2);
    }
}
