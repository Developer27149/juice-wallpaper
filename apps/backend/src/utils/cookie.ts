import * as jwt from 'jsonwebtoken';

export const jwtCookieOption = {
  httpOnly: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
}


export const genToken = (payload: { email: string, id: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET ?? '__JWT_SECRET__', { expiresIn: '30d' });
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET ?? '__JWT_SECRET__');
}
