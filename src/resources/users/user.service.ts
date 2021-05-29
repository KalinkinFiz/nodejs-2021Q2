/**
 * @file   This file define the user services
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Users
 */

import usersRepo from './user.memory.repository';
// import tasksRepo from '../tasks/task.memory.repository';
import { TUserModel, TUser } from './user.type';

/**
 * Get all users
 * @returns {Promise<TUserModel[]>} - array of users
 */
const getAll = async (): Promise<TUserModel[]> => usersRepo.getAll();

/**
 * User return by id
 * @param {string} id - id user
 * @returns {Promise<?TUserModel>} - return user object or null
 */
const getById = async (id: string): Promise<TUserModel | null> => usersRepo.getById(id);

/**
 * Create users
 * @param {TUser} user - new user parameters
 * @returns {Promise<TUserModel>} - return new user object
 */
const createUser = async (user: TUser): Promise<TUserModel> => usersRepo.createUser(user);

/**
 * Delete user; Removing users tasks
 * @param {string} id - user id
 * @returns {Promise<?TUserModel>} - return user object or null
 */
const deleteById = async (id: string): Promise<TUserModel | null> => {
  const userDeletable = await getById(id);
  usersRepo.deleteById(id);
  // tasksRepo.removeUserById(id);

  return userDeletable;
};

/**
 * Update user by id
 * @param {TUserModel} user - params for user update
 * @returns {Promise<?TUserModel>} - return user object or null
 */
const updateById = async (user: TUserModel): Promise<TUserModel | null> =>
  usersRepo.updateById(user);

export default { getAll, getById, createUser, deleteById, updateById };
