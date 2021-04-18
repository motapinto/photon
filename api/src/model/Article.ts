import { Node } from "./Node";

export interface Article extends Node {
  readonly properties: {
    title: string,
    url: string,
    publishedAt: string,
    score: number,
  };
}