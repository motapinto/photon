import express, { Request, Response } from 'express';
import Database from './database/Database';

(async () => {
    const app = express();

    app.get('/graph', async(_req: Request, res: Response) => {
        const records = await Database.getInstance().getGraph() ?? [];
        res.status(200).json(records);
    });

    const PORT = process.env.SERVER_PORT || 5000;
    app.listen(PORT, async() => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})();