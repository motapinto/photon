import { Node } from "./Node";

export interface Tweet extends Node {
  readonly properties: {
    id: string,
    text: string,
  };
}