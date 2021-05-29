import { TUserModel, TUser } from './user.type';
import User from './user.model';

const USERS: TUserModel[] = [];

const getAll = async (): Promise<TUserModel[]> => USERS;

const getById = async (id: string): Promise<TUserModel | null> =>
  USERS.find((user) => user.id === id) || null;

const createUser = async ({ name, login, password }: TUser): Promise<TUserModel> => {
  const user = new User({ name, login, password });
  USERS.push(user);
  return user;
};

const deleteById = async (id: string): Promise<TUserModel | null> => {
  const userPosition = USERS.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const userDeletable = USERS[userPosition];

  USERS.splice(userPosition, 1);
  return userDeletable!;
};

const updateById = async ({
  id,
  name,
  login,
  password,
}: TUserModel): Promise<TUserModel | null> => {
  const userPosition = USERS.findIndex((user) => user.id === id);

  if (userPosition === -1) return null;

  const oldUser = USERS[userPosition];
  const newUser = { ...oldUser, name, login, password, id };

  USERS.splice(userPosition, 1, newUser);
  return newUser!;
};

export default {
  USERS,
  getAll,
  getById,
  createUser,
  deleteById,
  updateById,
};
