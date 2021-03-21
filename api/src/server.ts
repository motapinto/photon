import express from 'express';
import { Request, Response } from 'express';

const app = express();
app.get('/', (req: Request, res: Response) => {
    res.send( 'Hello world!' );
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});