import { sequelize } from './../../data-access/data-access';
import { Op, Sequelize } from 'sequelize';
import uuid from 'uuid';

import { User, UserModel } from "../../models/user.model";

export class UserService {
  public async getAutoSuggestUsers(loginSubstring: any, limit: any): Promise<UserModel[]> {
    console.log('get users');
    
      return await User.findAll({
          where: {
              isDeleted: false,
              login: {
                  [ Op.like ]: `%${loginSubstring}%`,
              },
          },
          order: [['login', 'ASC']],
          limit,
      })
  };

  public async getUserById(id: string): Promise<UserModel | null> {
    return await User.findOne({
      where: {
        id,
      },
    });
  };

  public async createUser(user: UserModel): Promise<UserModel> {        
      const { id, login, password, age, isDeleted } = user;
      
      return await User.create({
        id,
        login,
        password,
        age, 
        isDeleted,
      });
  };

  public async updateUser(user: UserModel): Promise<UserModel> {
    console.log('UPDATE_USER');
    
    return await User.update({...user}, {
        where: {
          id: user.id,
      },
      returning: true,
    }).then(([_, updatedUsers]) => updatedUsers[0]);
  };

  public async removeUser(id: string): Promise<UserModel> {
    console.log('DELETE_USER');
    
    return await User.update({ isDeleted: true }, { where: { id }, returning: true }).then(([_, updatedUsers]) => updatedUsers[0]);
  };
}