declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  id: string;
  decoded: string | any;
  userId: string;
}

import { prisma } from '../lib/prisma';

import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.cookies.cookieToken;

    if (!token) {
      return res.status(400).json({ msg: 'bitte log dich ein' });
    }

    const { decoded } = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as JwtPayload;
    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    next();
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
