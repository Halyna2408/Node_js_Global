import express, { Application } from 'express';

import { routerUsers } from './routers/users.router';

const app: Application = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(express.json());

app.use('/api/users', routerUsers);

app.listen(PORT, (): void => {
  console.log(`Server Running on https://localhost:${PORT}`);
});
