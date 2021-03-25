import { RelationDirection } from "cypher-query-builder/dist/typings/clauses/relation-pattern";

export interface IEdge {
    readonly identity?: string;
    readonly direction: RelationDirection;
    readonly labels: string[];
    readonly properties?: Object;
}