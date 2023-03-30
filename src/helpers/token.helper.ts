import { UserAuthPayload } from './../models/user.model';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_REFRESH_SECRET } from '../../config';

const setAccessToken = (userAuthPayload: UserAuthPayload) => jwt.sign(userAuthPayload, JWT_SECRET, { expiresIn: '2m'});
const setRefreshToken = (userAuthPayload: UserAuthPayload) => jwt.sign(userAuthPayload, JWT_REFRESH_SECRET, { expiresIn: '2h'});

const verifyToken = (secretKey: string, token: string) => jwt.verify(token, secretKey)

export {
    setAccessToken,
    setRefreshToken,
    verifyToken,
}