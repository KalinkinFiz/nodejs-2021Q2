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

module.exports = {
  Users,
  getAll,
  getById,
  createUser,
};
