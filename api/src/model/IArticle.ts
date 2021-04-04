import { INode } from "./INode";

export interface IArticle extends INode {
    readonly properties: {
        title: string,
        url: string,
        publishedAt: string,
        score: number
    };
}