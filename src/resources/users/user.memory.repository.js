const User = require('./user.model');

const Users = [
  new User({ name: 'maxim', login: 'maxim', password: '12345qwerty' }),
];

const getAll = async () => Users;

const getById = async (id) => Users.find((user) => user.id === id);

const createUser = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  Users.push(user);
  return user;
};

const deleteById = async (id) => {
  const userPosition = Users.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const userDeletable = Users[userPosition];

  Users.splice(userPosition, 1);
  return userDeletable;
};

const updateById = async ({ id, name, login, password }) => {
  const userPosition = Users.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const oldUser = Users[userPosition];
  const newUser = { ...oldUser, name, login, password };

  Users.splice(userPosition, 1, newUser);
  return newUser;
};

module.exports = {
  Users,
  getAll,
  getById,
  createUser,
  deleteById,
  updateById,
};
