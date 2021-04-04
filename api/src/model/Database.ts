import { Connection, equals, node, relation } from 'cypher-query-builder';
import { IEdge } from './IEdge';
import { INode } from './INode';

export default class Database {
    private static instance: Database;
    private static neo4j: Connection;

    private constructor(url: string, username: string, password: string) {
        Database.neo4j = new Connection(url, { username, password });
    };

    /**
     * Returns a given node
     */
    public async getNode(oldNode: INode) {
        try {
            return Database.neo4j.matchNode('node', oldNode.labels, oldNode.properties)
                .return('node')
                .run();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Creates and returns a given node
     */
    public async createNode(newNode: INode, unique?: boolean) {
        try {
            if(unique && this.getNode(newNode)) {
                console.log(`Node: ${JSON.stringify(newNode)} already exists!`);
                return;
            }

            return Database.neo4j.createNode('n', newNode.labels, newNode.properties)
                .return('n')
                .run();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Creates an edge between two existing nodes
     */
    public async createEdge(origin: INode, dest: INode, edge: IEdge) {
        try {
            return Database.neo4j.matchNode('origin', origin.labels, origin.properties)
                .matchNode('dest', dest.labels, dest.properties)
                .create([
                    node('origin'),
                    relation(edge.direction, edge.labels, edge.properties),
                    node('dest'),
                ])
                .run();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Creates the two nodes, if they don't exist, and the edge between them
     */
    public async mergeNodes(origin: INode, dest: INode, edge: IEdge) {
        try {
            return Database.neo4j.matchNode('origin', origin.labels, origin.properties)
            .matchNode('dest', dest.labels, dest.properties)
            .merge([
                node('origin'),
                relation(edge.direction, edge.labels, edge.properties),
                node('dest'),
            ])
            .run();
            
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Returns graph from root node 'Energy'
     */
    public async getGraph() {
        
    }

    public async drop() {
        try {
            return Database.neo4j.matchNode('n').detachDelete('n').run();
        } catch (error) {
            console.error(error);
        }
    }

    public async close() {
        if(Database.neo4j) {
            try {
                await Database.neo4j.close();
            } catch (error) {
                console.error(error);
            }
        }
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database(
                process.env.DATABASE_URI || 'neo4j://localhost:7687', 
                process.env.DATABASE_USERNAME || 'neo4j', 
                process.env.DATABASE_PASSWORD || 'test'
            )
        }        

        return Database.instance;
    };
};