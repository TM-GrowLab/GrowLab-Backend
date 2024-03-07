import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger.json";

import * as bodyParser from 'body-parser';

// import dbTest from "./config/db"

import cors from 'cors'; // Importeer de cors-middleware
import routes from './routes/route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Voeg de cors-middleware toe
app.use(cors());

// applying the routes to the basepath '/api'
app.use('/api', routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express & TypeScript Server running");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
