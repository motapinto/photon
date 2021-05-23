import neo4j, { Driver, Record } from 'neo4j-driver'
import Utils from '@utils/Utils';
import { Edge } from '@model/Edge';
import { Node } from '@model/Node';
import { errorLogger } from '@logger';

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

  private session() {
    const session = Database.neo.session();
    if(session === undefined) {
      throw new Error("Session is undefined!");
    }

    return session;
  }

  public async query(statement: string, populate?: boolean): Promise<Record[] | undefined> {
    const session = Database.neo.session();
    if(session === undefined) {
      throw new Error("Session is undefined!");
    }

    try {
      const res = await session.run(statement);
      return res.records;    
    } catch (err) {
      throw new Error(err.message);
    } finally {
      await session.close();
    }
  }

  public async transactionQuery(statement: string): Promise<Record[] | undefined> {
    const session = this.session();
    const tx = session.beginTransaction();

    try {
      const res = await session.run(statement);
      await tx.commit();
      return res.records;  
    } catch (err) {
      await tx.rollback();
    } finally {
      await session.close();
    }
  }

  public async createNode<T extends Node>(node: T) {    
    return this.query(`
      CREATE (n: ${node.label} ${Utils.stringify(node.properties)})
    `);
  }

  public async createOrGetNode<T extends Node>(node: T) {
    return this.query(`
      MERGE (n: ${node.label} ${Utils.stringify(node.properties)})
    `);
  }

  public async createEdge<T1 extends Node, E extends Edge, T2 extends Node>(origin: T1, dest: T2, edge: E) {        
    return this.query(`
      MATCH (origin: ${origin.label} ${Utils.stringify(origin.properties)}), (dest: ${dest.label} ${Utils.stringify(dest.properties)})
      MERGE (origin)-[e: ${edge.label} ${Utils.stringify(edge.properties)}]->(dest)
      RETURN origin, e, dest
    `);
  }

  public async loadOntology() {
    try {
      await this.query(`DROP CONSTRAINT n10s_unique_uri IF EXISTS`);
      await this.query(`CALL n10s.graphconfig.init()`);
      await this.query(`CREATE CONSTRAINT n10s_unique_uri ON (r:Resource) ASSERT r.uri IS UNIQUE;`);
      await this.query(`CALL n10s.onto.import.fetch("${process.env.ONTOLOGY_LINK}","${process.env.ONTOLOGY_FORMAT}");`);      
    } catch(err) {
      throw new Error(err.message);
    }
  }

  public async getGraph(): Promise<Record[] | undefined> {
    return this.query(`
      MATCH (origin)-[edge]-(dest) 
      RETURN origin, edge, dest;
    `);
  }

  public async dropDB() {
    return this.query(`
      MATCH(n) 
      DETACH DELETE n
    `);
  }

  public async close() {
    if(Database.neo) {
      try {
        Database.neo.close();
      } catch (error) {
        errorLogger.error(error.message);
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