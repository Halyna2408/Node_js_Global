import { Group } from './group.model';
import { User } from './user.model';
import { sequelize } from './../data-access/data-access';
import { Model, DataTypes } from 'sequelize';

export interface UserGroup extends Model {
  userId: string;
  groupId: string;
};

export const UserGroup = sequelize.define<UserGroup>('UserGroup', {
  userId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  groupId: {
    type: DataTypes.STRING,
    references: {
      model: Group,
      key: 'id',
    },
  },  
}, {
  tableName: 'UserGroup',
});