export interface INode {
    readonly identity?: string;
    readonly labels: string[];
    readonly properties: Object;
}