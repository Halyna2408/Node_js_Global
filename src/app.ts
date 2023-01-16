import { sequelize } from './data-access/data-access';
import express, { Application } from 'express';

import { routerUsers } from './routers/users.router';
import { User } from './models/user.model';
import { usersData } from './data/users.data';

const app: Application = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(express.json());

app.use('/api/users', routerUsers);


sequelize.authenticate()
.then(() => console.log('Connected'))
.then(() => User.sync({ force: true }))
.then(() => User.bulkCreate(usersData))
.then(() => console.log('data was inserted to Users table'))
.catch((error: Error) => console.log(`Oops! Something wents wrong: ${ error }`));

app.listen(PORT, (): void => {
  console.log(`Server Running on https://localhost:${PORT}`);
});