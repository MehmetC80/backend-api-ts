import jwt from 'jsonwebtoken';

export const getJwtToken = (userId: string) => {
  return jwt.sign({ userId: userId }, `${process.env.JWT_SECRET}`, {
    expiresIn: '1d',
  });
};
