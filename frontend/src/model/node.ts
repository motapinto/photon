export default class Node {
    id: string;
    label: string;
    val: number;
    visible: boolean;

    constructor(id: string, label: string, val: number = 4, visible: boolean = true) {
        this.id = id;
        this.label = label;
        this.val = val * (val/2);
        this.visible = visible;
    }
}
