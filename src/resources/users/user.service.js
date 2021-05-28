/**
 * @file   This file define the user services
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Users
 */

const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * Get all users
 * @returns {Promise<TUserModel[]>} - array of users
 */
const getAll = async () => usersRepo.getAll();

/**
 * User return by id
 * @param {string} id - id user
 * @returns {Promise<?TUserModel>} - return user object or null
 */
const getById = async (id) => usersRepo.getById(id);

/**
 * Create users
 * @param {TUser} newUser - new user parameters
 * @returns {Promise<TUserModel>} - return new user object
 */
const createUser = async ({ name, login, password }) =>
  usersRepo.createUser({ name, login, password });

/**
 * Delete user; Removing users tasks
 * @param {string} id - user id
 * @returns {Promise<?TUserModel>} - return user object or null
 */
const deleteById = async (id) => {
  const userDeletable = await getById(id);
  usersRepo.deleteById(id);
  tasksRepo.removeUserById(id);

  return userDeletable;
};

/**
 * Update user by id
 * @param {TUserModel} TUser - params for user update
 * @returns {Promise<?TUserModel>} - return user object or null
 */
const updateById = async ({ id, name, login, password }) =>
  usersRepo.updateById({ id, name, login, password });

module.exports = { getAll, getById, createUser, deleteById, updateById };
