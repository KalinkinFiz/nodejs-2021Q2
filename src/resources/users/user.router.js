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
      res.status(201).send(User.toResponse(user));
    } else {
      res.status(404).send('User not create');
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
      res.status(404).send('User not found');
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;

    const user = await usersService.updateUserId({ id, name, login, password });

    if (user) {
      res.status(200).send(User.toResponse(user));
    } else {
      res.status(404).send('User not found');
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const user = await usersService.deleteUserId(id);

    if (user) {
      res.status(204).send('The user has been deleted');
    } else {
      res.status(404).send('User not found');
    }
  })
);

module.exports = router;
