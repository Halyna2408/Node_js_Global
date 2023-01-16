import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import { UserService }  from './services/users.service';

const userService = new UserService();

export const getUserInfo = ( async (req: Request, res: Response, next: NextFunction) => {

  const user: UserModel | null = await userService.getUserById(req.params.id);
  
  if(user) {
    const { id, login, password, age, isDeleted } = user;

    return res.status(200).json({
      user: {
          id,
          login,
          password,
          age,
          isDeleted,
      }
    });
  }
});

export const updateUserInfo = ( async (req: Request, res: Response, next: NextFunction) => {  
  console.log("UPDATE_USER");
  
  const updatedUser: UserModel = await userService.updateUser(req.body);
  const { id, login, password, age, isDeleted } = updatedUser;
  
  return res.status(200).json({
      user: {
        id,
        login,
        password,
        age,
        isDeleted,
    }
  })
});

export const getAllUsers = ( async (req: Request, res: Response, next: NextFunction) => {
  const { loginSubstring, limit } = req.query;
  const users: UserModel[] = await userService.getAutoSuggestUsers(loginSubstring, limit);

  res.status(200).json({
    message: 'Success',
    users
  });
});

export const addUser = ( async (req: Request, res: Response, next: NextFunction) => {
  const newUser: UserModel = await userService.createUser(req.body);
  
  if(newUser) {
    res.status(200).json({
      message: `${newUser} was created successufuly`,
      newUser,
    });
  };
});

export const deleteUser = ((req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.id);
  
  const user: any = userService.removeUser(req.params.id);
  res.status(200).json({
    message: 'User marked as removed', 
    user
  });
});
