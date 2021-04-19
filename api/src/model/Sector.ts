import { Node } from "./Node";

export interface Sector extends Node {
  readonly properties: {
    name: string,
    growth: number,
    numNews: number,
  };
}