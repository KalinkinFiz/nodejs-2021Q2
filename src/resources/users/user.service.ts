import { getCustomRepository } from 'typeorm';
import UserModel from './user.entity';

import { UserRepository } from './user.memory.repository';
// import tasksRepo from '../tasks/task.memory.repository';

const createUser = async ({ name, login, password }: Omit<UserModel, 'id'>): Promise<UserModel> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.createUser({ name, login, password });
  return user;
};

const getAll = async (): Promise<UserModel[]> => {
  const userRepository = getCustomRepository(UserRepository);
  return userRepository.getAllUsers();
};

const getById = async (id: string): Promise<UserModel | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getById(id);
  if (!user) return null;
  return user;
};

const deleteById = async (id: string): Promise<UserModel | null> => {
  const userRepository = getCustomRepository(UserRepository);
  const userDeletable = await userRepository.getById(id);
  if (!userDeletable) return null;
  await userRepository.deleteById(id);
  return userDeletable;
};

const updateById = async (id: string, users: Omit<UserModel, 'id'>): Promise<UserModel | null> => {
  const userRepository = getCustomRepository(UserRepository);
  await userRepository.updateById(id, users);
  const user = await userRepository.getById(id);
  if (!user) return null;
  return user;
};

export default { getAll, getById, createUser, deleteById, updateById };
