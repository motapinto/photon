import express from 'express';
import { Request, Response } from 'express';
import { Database } from './model/Database';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req: Request, res: Response) => {
    const initData = {
        nodes: [ { id: 0 }, { id: 1 }, { id: 2 } ],
        links: [ { source: 0, target: 1 }, { source: 0, target: 2 }, { source: 1, target: 2 }]
    };
    res.send(initData);
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, async() => {
    console.log(`Server started at http://localhost:${PORT}`);
    Database.getInstance().createTestNode();
});