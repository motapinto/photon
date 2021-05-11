import { Node } from "./Node";

export interface RedditComment extends Node {
    readonly properties: {
      id: string,
    };
  }