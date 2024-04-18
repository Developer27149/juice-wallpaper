import { IJwt } from '@juice-wallpaper/types';
import * as jwt from 'jsonwebtoken';

export const genToken = (payload: { email: string, id: string }) => {
  return jwt.sign(payload, process.env['JWT_SECRET'] ?? '__JWT_SECRET__', { expiresIn: '30d' });
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env['JWT_SECRET'] ?? '__JWT_SECRET__') as IJwt;
}
