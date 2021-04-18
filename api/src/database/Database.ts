import neo4j, { Driver, Record } from 'neo4j-driver'
import Utils from '../utils/Utils';
import { Edge } from './../model/Edge';
import { Node } from './../model/Node';

export default class Database {
  private static instance: Database;
  private static neo: Driver;

  private static url: string;
  private static username: string;
  private static password: string;

  private constructor(url: string, username: string, password: string) {
    Database.url = url;
    Database.username = username;
    Database.password = password;
    this.connect();
  };

  private connect() {
    Database.neo = neo4j.driver(
      Database.url,
      neo4j.auth.basic(Database.username, Database.password)
    );
  };

  public async query(statement: string, populate?: boolean): Promise<Record[] | undefined> {
    const session = Database.neo.session();
    if(session === undefined) {
      throw new Error("Session is undefined!");
    }

    try {
      const res = await session.run(statement);
      session.close();
      return res.records;    
    } catch (error) {
      if(populate) {
        this.query(statement, populate);
      } else {
        console.error(error);
      }
    } finally {
      session.close();
    }
  }

  public async createNode<T extends Node>(node: T) {
    return await this.query(`
      CREATE (n: ${node.label} ${Utils.stringify(node.properties)})
    `);
  }

  public async createEdge<T1 extends Node, E extends Edge, T2 extends Node>(origin: T1, dest: T2, edge: E) {
    return await this.query(`
      MATCH (origin: ${origin.label} ${Utils.stringify(origin.properties)}), (dest: ${dest.label} ${Utils.stringify(dest.properties)})
      MERGE (origin)-[e: ${edge.label} ${Utils.stringify(edge.properties)}]->(dest)
      RETURN origin, e, dest
      `);
  }

   /**
     * Returns graph from root node 'Energy'
     */
    public async getGraph() {
        
    }

  public async dropDB() {
    return await this.query(`
      MATCH(n) 
      DETACH DELETE n
    `);
  }

    // /**
    //  * Returns a given node
    //  */
    // public async getNode(oldNode: Node) {
    //     try {
    //         return Database.neo4j.matchNode('node', oldNode.labels, oldNode.properties)
    //             .return('node')
    //             .run();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // /**
    //  * Creates the two nodes, if they don't exist, and the edge between them
    //  */
    // public async mergeNodes(origin: Node, dest: Node, edge: Edge) {
    //     try {
    //         return Database.neo4j.matchNode('origin', origin.labels, origin.properties)
    //         .matchNode('dest', dest.labels, dest.properties)
    //         .merge([
    //             node('origin'),
    //             relation(edge.direction, edge.labels, edge.properties),
    //             node('dest'),
    //         ])
    //         .run();
            
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    public async close() {
    if(Database.neo) {
      try {
        Database.neo.close();
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
      );
    }        

    return Database.instance;
  };
};