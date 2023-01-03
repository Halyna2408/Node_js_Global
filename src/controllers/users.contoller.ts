import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { UserService }  from './services/users.service';

const userService = new UserService();

export const getUserInfo = ((req: Request, res: Response, next: NextFunction) => {
  console.log('get userInfo');
  
  const user: User = userService.getUserById(req.params.id);
  
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

export const updateUserInfo = ((req: Request, res: Response, next: NextFunction) => {
  console.log('updateUserInfo');
  
  const updatedUser: User = userService.updateUser(req.body);
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

export const getAllUsers = ((req: Request, res: Response, next: NextFunction) => {
  const { loginSubstring, limit } = req.query;
  const users: User[] = userService.getAutoSuggestUsers(loginSubstring, limit);

  res.status(200).json({
    message: 'Success',
    users
  });
});
