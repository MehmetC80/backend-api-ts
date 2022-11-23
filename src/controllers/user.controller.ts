// bring prisma and cookie
import { User } from '../types/user.type';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { cookieToken } from '../helpers/cookieToken';

//user signup

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    //check

    // check name,email,password is set
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Email, Passwort oder Name müssen vollständig sein' });
    }

    // name is to short or empty
    if (name === '' || name.length <= 2) {
      return res.status(400).json({ error: 'Name ist zu kurz' });
    }

    // email is not vailde
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email ist nicht valide' });
    }

    //generating salt
    const salt = await bcrypt.genSalt(10);

    // hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    // send user a token
    cookieToken(user, res);
    console.log(user);
    // return res.status(201).json({ user, msg: 'user in die DB eingefügt' });
  } catch (err) {
    res.status(400).json({
      error: err,
      msg: 'server fehler user kann nicht erstellt werden',
    });
  }
};

// user login

export const login = async (req: Request, res: Response) => {
  try {
    //take info from user

    const { email, password } = req.body;

    //checks
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: 'Email und Passwort  müssen vollständig sein' });
    }

    //find user based n email

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // When there is no user
    if (!user) {
      return res.status(401).json({ msg: 'User ist nicht registiert' });
    }

    const match = await bcrypt.compare(password, user.password);

    //user us there

    // pasword mismatch
    if (!match) {
      // throw Error('Password ist falsch!!!');
      return res.status(400).json({ error: 'Password ist falsch!!!' });
    }

    //user is there and validated

    cookieToken(user, res);

    console.log(user, cookieToken.name);
  } catch (err) {
    res.status(400).json({
      error: err,
      msg: 'server fehler user kann nicht eingeloggt werden',
    });
  }
};

//logout user

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('cookieToken');
    res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err, msg: 'logout ist fehlgeschlagen' });
  }
};
