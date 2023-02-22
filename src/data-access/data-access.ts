import { Sequelize } from 'sequelize';

const DB_PATH = 'postgres://postgres:vika2408@localhost:5432/postgres';

export const sequelize = new Sequelize(DB_PATH);
