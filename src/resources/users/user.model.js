/**
 * @file   This file defines a user class
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Users
 */

const { v4: uuid } = require('uuid');

/** Class representing a User model */
class User {
  /**
   * Creates a user instance
   * @param {TUserModel} user - user Object
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return static data for user
   * @param {TUserModel} user
   * @returns {TUserResponse} User parameters
   */

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
