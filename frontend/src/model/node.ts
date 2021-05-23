export default class Node {
    id: string;
    labels: string[];
    val?: number;

    constructor(id: string, labels: string[], val: number = 4) {
        this.id = id;
        this.labels = labels;
        this.val = val * (val/2);
    }
}
