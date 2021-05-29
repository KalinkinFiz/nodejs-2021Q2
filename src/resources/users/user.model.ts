/**
 * @file   This file defines a user class
 * @author KalinkinFiz
 * @since  1.0.0
 *
 * @namespace Users
 */

import { v4 as uuid } from 'uuid';

import { TUserModel, TUserResponse } from './user.type';

/** Class representing a User model */
class User {
  /**
   * Creates a user instance
   * @param {TUserModel} user - user Object
   */
  id: string;

  name: string;

  login: string;

  password: string;

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
   * @param {TUserModel} user passing the user object
   * @returns {TUserResponse} User parameters
   */

  static toResponse(user: TUserModel): TUserResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
