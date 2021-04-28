import express, { Request, Response } from 'express';
import Database from './database/Database';
import cors from 'cors';

(async () => {
    const app = express();
    app.use(cors());

    app.get('/graph', async(_req: Request, res: Response) => {
        const records = await Database.getInstance().getGraph() ?? [];
        res.status(200).json(records);
    });

    const PORT = process.env.SERVER_PORT || 5000;
    app.listen(PORT, async() => {
        console.log(`Server started at port ${PORT}`);
    });
})();