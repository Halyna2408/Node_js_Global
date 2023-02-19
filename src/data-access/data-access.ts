import { Sequelize } from 'sequelize';

const DB_PATH = 'postgres://qqtmgrsk:vxl6qg7whM2txL00WFgZY1ZRNyBPYVk0@dumbo.db.elephantsql.com/qqtmgrsk';

export const sequelize = new Sequelize(DB_PATH);
