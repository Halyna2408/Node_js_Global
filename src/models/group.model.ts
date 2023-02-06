import { sequelize } from './../data-access/data-access';
import { DataTypes, Model } from "sequelize";

export enum Permissions {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES',
}

export enum GroupName {
  DEV = 'DEV',
  LEAD = 'LEAD',
  QA = 'QA',
  BA = 'BA',
}

export interface GroupModel extends Model {
  id: string;
  name: string;
  permissions: Permissions[];
}

export const Group = sequelize.define<GroupModel>('Group', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.CHAR,
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.ENUM({
      values: [ 
        Permissions.READ, 
        Permissions.WRITE, 
        Permissions.DELETE, 
        Permissions.SHARE, 
        Permissions.UPLOAD_FILES
      ],
    })),
  }
}, {
  tableName: 'Groups',
});
