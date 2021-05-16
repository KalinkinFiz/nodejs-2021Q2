const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { name, login, password } = req.body;

    const user = await usersService.createUser({ name, login, password });

    if (user) {
      res.status(StatusCodes.CREATED).json(User.toResponse(user));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const user = await usersService.getById(id);

    if (user) {
      res.json(User.toResponse(user));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;

    const user = await usersService.updateById({ id, name, login, password });

    if (user) {
      res.status(StatusCodes.OK).json(User.toResponse(user));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const user = await usersService.deleteById(id);

    if (user) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'USER_DELETED', msg: 'The user has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
    }
  })
);

module.exports = router;
