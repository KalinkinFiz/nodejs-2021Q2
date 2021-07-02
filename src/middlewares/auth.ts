import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import jwt, { Secret } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import config from '../common/config';

import { UserRepository } from '../resources/users/user.memory.repository';

const { JWT_SECRET_KEY } = config;

export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  const sessionToken = req.headers.authorization?.split(' ')[1];

  if (!sessionToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(sessionToken, <Secret>JWT_SECRET_KEY, async (_err, decoded) => {
    if (decoded) {
      try {
        const userRepository = getCustomRepository(UserRepository);

        const { id } = decoded;
        const user = await userRepository.getById(id);
        if (!user) {
          return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'not authorized' });
        }
        return next();
      } catch {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'not authorized' });
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'not authorized' });
    }
  });
});
