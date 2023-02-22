import { sequelize } from './../data-access/data-access';
import { Model, DataTypes } from 'sequelize';

export interface UserGroup extends Model {
  userId: string;
  groupId: string;
};

export const UserGroup = sequelize.define<UserGroup>('UserGroup', {}, {
  tableName: 'UserGroup',
});