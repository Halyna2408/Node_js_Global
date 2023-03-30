import { JWT_REFRESH_SECRET } from './../../config';
import { UserAuthPayload } from './../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './services/users.service';
import * as bcrypt  from 'bcrypt';
import { setAccessToken, setRefreshToken, verifyToken } from '../helpers/token.helper';

const userService = new UserService();

export const registration =  async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;
    const user = await userService.findUserByCredential(login);
    console.log(user)
    if(!!user) {
        return res.status(400).json({ message: 'User already exist with the given login' });
    }

    await (await userService.registration(login, password)).save();
    return res.status(201).json({message: 'Profile created successfully'});
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password }: UserAuthPayload = req.body;

    const user = await userService.findUserByCredential(login);

    if(!user) {
        return res.status(404).json({ message: `user with login: ${login} not found`})
    }
    console.log(password)
    console.log(user.password)
    console.log(password.trim() == user.password.trim());
    
    // await bcrypt.compare(password, user.password.trim())
    if(password.trim() == user.password.trim()) {
        const accessToken = setAccessToken({ login, password });
        const refreshToken = setRefreshToken({ login, password })
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.PRODUCTION_ENV === "production",
            sameSite: "strict",
          });

        res.json({
            accessToken,
        });
    } else {
        res.status(403).json({ message: `Incorrect password`})
    }
}

export const setToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

    const user = verifyToken(JWT_REFRESH_SECRET, refreshToken);
    const accessToken = setAccessToken(user as any);
    res.status(200).json({ accessToken });
}
  