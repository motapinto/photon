import express from 'express';
import { Request, Response } from 'express';
import { Database } from './model/Database';

const app = express();
app.get('/', (req: Request, res: Response) => {
    res.send( 'Hello world!' );
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, async() => {
    console.log(`Server started at http://localhost:${PORT}`);
    Database.getInstance().createTestNode();
});