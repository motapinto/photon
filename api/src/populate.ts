import Database from "./model/Database";
import { IEdge } from "./model/IEdge";
import { INode } from "./model/INode";

(async () => {
    const countries: INode[] = [
        { 
            labels: ['Country'], 
            properties: { name: 'Portugal' } 
        },
        { 
            labels: ['Country'], 
            properties: { name: 'US' } 
        },
        { 
            labels: ['Country'], 
            properties: { name: 'UK' } 
        },
        { 
            labels: ['Country'], 
            properties: { name: 'Colombia' } 
        },
        { 
            labels: ['Country'], 
            properties: { name: 'Germany' } 
        },
        { 
            labels: ['Country'], 
            properties: { name: 'Sweden' } 
        },
        { 
            labels: ['Country'], 
            properties: { name: 'Brazil' } 
        },
        { 
            labels: ['Country'], 
            properties: { name: 'China' } 
        }
    ];

    try {        
        const db = Database.getInstance();

        //Drops the database
        await db.drop();

        // Creates countries
        await Promise.all([
            db.createNode(countries[0]),
            db.createNode(countries[1]),
            db.createNode(countries[2]),
            db.createNode(countries[3]),
            db.createNode(countries[4]),
            db.createNode(countries[5]),
            db.createNode(countries[6]),
            db.createNode(countries[7]),
        ]);   

        console.log("DB is now populated!");
        process.exit();
    } catch (error) {
        console.error(error);
    }
})();
