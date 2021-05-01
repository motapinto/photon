import { Node } from "./Node";

export interface Article extends Node {
  readonly properties: {
    title: string,
    url: string,
    description: string,
    body: string,
    datePublished: string,
    score: number,
  };
}