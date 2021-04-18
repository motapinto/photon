import { Node } from "./Node";

export interface Country extends Node {
  readonly properties: {
    name: string,
  };
}