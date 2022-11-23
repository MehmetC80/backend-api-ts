import { getJwtToken } from './getJwtToken';

export const cookieToken = (user: any, res: any) => {
  const token = getJwtToken(user.id);

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  user.password = undefined;

  res.cookies('cookieToken', token, options).json({
    success: true,
    token,
    user,
  });
};
