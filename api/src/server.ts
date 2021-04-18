import express, { Request, Response } from 'express';
import { Record } from 'neo4j-driver';
import Database from './database/Database';

(async () => {
    const app = express();
    app.get('/', (_req: Request, res: Response) => {
        res.send( 'This is the main page!' );
    });

    app.get('/graph', async(_req: Request, res: Response) => {
        const records = await Database.getInstance().getGraph() ?? [];
        const record1: Record = records[1];
        console.log(record1.get('origin'));
        console.log(record1.get('edge'));
        console.log(record1.get('dest'));
        
        res.status(200).send( 'This is the graph visualization page!' );
    });

    app.get('/about', (_req: Request, res: Response) => {
        res.send( 'This is the about page' );
    });

    app.get('/contributors', (_req: Request, res: Response) => {
        res.send( 'This is the contributors page' );
    });

    const PORT = process.env.SERVER_PORT || 5000;
    app.listen(PORT, async() => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})();