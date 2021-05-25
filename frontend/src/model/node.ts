export default class Node {
    id: string;
    label: string;
    val: number;
    visible: boolean;

    constructor(id: string, label: string, val: number = 4, visible: boolean = true) {
        this.id = id;
        this.label = label;
        //TODO mudar isto
        this.val = id === "0_698" ? 300 : val * (val/2);
        this.visible = visible;
    }
}
