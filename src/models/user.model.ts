import { sequelize } from './../data-access/data-access';
import { DataTypes, Model } from 'sequelize';

export interface UserModel extends Model {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
    refreshToken?: string;
}

export const User = sequelize.define<UserModel>('User', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    refreshToken: DataTypes.STRING,
}, {
    tableName: 'Users'
});


export interface UserAuthPayload {
  login: string;
  password: string;
}
