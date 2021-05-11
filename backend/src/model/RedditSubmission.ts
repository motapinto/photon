import { Node } from "./Node";

export interface RedditSubmission extends Node {
    readonly properties: {
      id: string,
    };
  }