import express from 'express';
import { Request, Response } from 'express';

(async () => {
    const app = express();
    app.get('/', (_req: Request, res: Response) => {
        res.send( 'This is the main page!' );
    });

    app.get('/graph', (_req: Request, res: Response) => {
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