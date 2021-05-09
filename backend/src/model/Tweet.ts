import { Node } from "./Node";

export interface Tweet extends Node {
  readonly properties: {
    id: string,
    created_at: string,
    author_id: string
    text: string,
    entities: object,
    context_annotations: object,
    public_metrics: {
      retweet_count: number,
      reply_count: number,
      like_count: number,
      quote_count: number
    }
  };
}