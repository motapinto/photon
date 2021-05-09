export default class Node {
    id: number;
    label: string;
    val?: number;

    constructor(id: number, label: string, val: number = 1) {
        this.id = id;
        this.label = label;
        this.val = val * (val/2);
    }
}
