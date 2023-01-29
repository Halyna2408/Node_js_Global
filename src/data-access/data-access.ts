import { Sequelize } from 'sequelize';

const DB_PATH = 'postgres://kmqjoris:k6XtU0ZciEijiMtl1zxugUzMMmlyx7lQ@dumbo.db.elephantsql.com/kmqjoris';

export const sequelize = new Sequelize(DB_PATH);
