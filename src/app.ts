import { Group } from './models/group.model';
import { sequelize } from './data-access/data-access';
import express, { Application } from 'express';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';
import { routerUsers } from './routers/users.router';
import { User } from './models/user.model';
import { usersData } from './data/users.data';
import { groupRouters } from './routers/group.router';
import { groupData } from './data/group.data';
import { UserGroup } from './models/user-group.model';
import { ResponseError } from './helpers/error-handling.helper';

const app: Application = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(express.json());
// Logger
app.use(morgan('dev'));

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

app.use((err: Error, _: Request, res: Response) => {
    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
});

app.use('/api/users', routerUsers);
app.use('/api/groups', groupRouters);


sequelize.authenticate()
.then(() => User.belongsToMany(Group, {
  through: UserGroup,
}))
.then(() => Group.belongsToMany(User, {
  through: UserGroup,
}))

.then(() => User.sync({ force: true }))
.then(() => Group.sync({ force: true }))
.then(() => UserGroup.sync({ force: true }))

.then(() => User.bulkCreate(usersData))
.then(() => Group.bulkCreate(groupData))

.catch((error: Error) => console.log(`Oops! Something wents wrong: ${ error }`));

app.listen(PORT, (): void => {
  console.log(`Server Running on https://localhost:${PORT}`);
});