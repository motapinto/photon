import { RelationDirection } from "cypher-query-builder/dist/typings/clauses/relation-pattern";

export interface IEdge {
    identity?: string;
    direction: RelationDirection;
    labels: string[];
    properties?: Object;
}