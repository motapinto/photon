import { Connection, equals, node, relation } from 'cypher-query-builder';

export class Database {
    private static instance: Database;
    private static neo4j: Connection;

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
        Database.neo4j = new Connection(Database.url, {
            username: Database.username,
            password: Database.password
        });
    };

    public async createTestNode() {        
        try {
            const results = await Database.neo4j.matchNode('person', 'Person')
            .where({ 'person.name': equals('Martim') })
            .return('person')
            .run();

            let rows = results.map(row => row.person);

            if(rows.length == 0) {
                await Database.neo4j.create([
                    node('person', 'Person', { name: 'Martim' }),
                    relation('out', '', 'HasVehicle'),
                    node('vehicle', 'Vehicle', { brand: 'Ferrari', colour: 'red' })
                ])
                .run();
            }
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