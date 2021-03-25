import express from 'express';
import { Request, Response } from 'express';

const app = express();
app.get('/', (req: Request, res: Response) => {
    res.send( 'This is the main page!' );
});

app.get('/graph', (req: Request, res: Response) => {
    res.send( 'This is the graph visualization page!' );
});

app.get('/about', (req: Request, res: Response) => {
    res.send( 'This is the about page' );
});

app.get('/contributors', (req: Request, res: Response) => {
    res.send( 'This is the contributors page' );
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, async() => {
    console.log(`Server started at http://localhost:${PORT}`);
});