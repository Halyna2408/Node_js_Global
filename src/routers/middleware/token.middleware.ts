import { JWT_SECRET } from './../../../config';
import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export  const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers['authorization'];  

  
  if (!token) return res.status(401).json({ message: 'Unauthorized user'});

  jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null) => {
    if (err) return res.sendStatus(403).json({ message: 'Invalid token' });
    next();
  });
};
