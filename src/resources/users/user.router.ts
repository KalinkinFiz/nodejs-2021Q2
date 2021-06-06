import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from './user.model';
import usersService from './user.service';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const { name, login, password } = req.body;

    const user = await usersService.createUser({ name, login, password });

    if (user) {
      res.status(StatusCodes.CREATED).json(User.toResponse(user));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
    }
  }),
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await usersService.getById(id || '');

    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  }),
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, login, password } = req.body;

    const user = await usersService.updateById({ id: id || '', name, login, password });

    if (user) {
      res.status(StatusCodes.OK).json(User.toResponse(user));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  }),
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await usersService.deleteById(id || '');

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'USER_DELETED', msg: 'The user has been deleted' });
  }),
);

export default router;
