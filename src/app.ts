
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser';
import cors  from 'cors';

import { checkAccessToken } from './routers/middleware/token.middleware';
import { authRouters } from './routers/authRouter';
import { Group } from './models/group.model';
import { sequelize } from './data-access/data-access';
import express, { Application } from 'express';
import { Request, Response, NextFunction } from 'express';
import { routerUsers } from './routers/users.router';
import { User } from './models/user.model';
import { usersData } from './data/users.data';
import { groupRouters } from './routers/group.router';
import { groupData } from './data/group.data';
import { UserGroup } from './models/user-group.model';
import { ResponseError } from './helpers/error-handling.helper';
import { logger } from './helpers/logger.helper';

dotenv.config();
const app: Application = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

process
  .on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection at Promise', reason);
  })
  .on('uncaughtException', err => {
    logger.error('Uncaught Exception thrown', err);
    process.exit(1);
  });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Response err', err)
    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({ message: err.message });
        logger.error(`${err.statusCode || 404} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    }
    res.status(500).json({ message: err.message });
    logger.error(`500 - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
});

app.use('/api', authRouters);
app.use('/api/users', checkAccessToken, routerUsers);
app.use('/api/groups', checkAccessToken, groupRouters);


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

  .catch((error: Error) => logger.error(`Oops! Something wents wrong: ${ error }`));

app.listen(PORT, (): void => {
  logger.info(`Server Running on https://localhost:${PORT}`);
});
