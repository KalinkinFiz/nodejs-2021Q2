const User = require('./user.model');

const USERS = [
  new User({ name: 'maxim', login: 'maxim', password: '12345qwerty' }),
];

const getAll = async () => USERS;

const getById = async (id) => USERS.find((user) => user.id === id);

const createUser = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  USERS.push(user);
  return user;
};

const deleteById = async (id) => {
  const userPosition = USERS.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const userDeletable = USERS[userPosition];

  USERS.splice(userPosition, 1);
  return userDeletable;
};

const updateById = async ({ id, name, login, password }) => {
  const userPosition = USERS.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const oldUser = USERS[userPosition];
  const newUser = { ...oldUser, name, login, password };

  USERS.splice(userPosition, 1, newUser);
  return newUser;
};

module.exports = {
  USERS,
  getAll,
  getById,
  createUser,
  deleteById,
  updateById,
};
