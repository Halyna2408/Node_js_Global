import { v4 as uuidv4 } from 'uuid';
import * as bcrypt  from 'bcrypt';
import { Op } from 'sequelize';

import { User, UserModel } from "../../models/user.model";
import { Group } from '../../models/group.model';

export class UserService {
  public async getAutoSuggestUsers(loginSubstring: any, limit: any): Promise<UserModel[]> {    
      return await User.findAll({
          include: Group,
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
      return await User.create({
        ...user,
        id: uuidv4(),
      });
  };

  public async updateUser(user: UserModel): Promise<UserModel> {    
    return await User.update({...user}, {
        where: {
          id: user.id,
      },
      returning: true,
    }).then(([_, updatedUsers]) => updatedUsers[0]);
  };

  public async removeUser(id: string): Promise<any> {    
    return await User.update({ isDeleted: true }, { where: { id }, returning: true }).then(([_, updatedUsers]) => updatedUsers);
  };

  public async findUserByCredential(login: string): Promise<UserModel | null> {
    return await User.findOne({
      where: {
        login,
      },
    });
  }

  public async registration(login: string, password: string): Promise<UserModel> {
    return await User.create({
      id: uuidv4(),
      login,
      password: await bcrypt.hash(password, 10),
    })
  }
}