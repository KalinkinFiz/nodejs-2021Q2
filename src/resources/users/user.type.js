/**
 * User type
 * @typedef {Object} TUser
 * @property {string} name - User name
 * @property {string} login - User login
 * @property {string} password - User password
 */

/**
 * @typedef {TUser & { id: string }} TUserModel TUserModel represents properties defined in TUser and id
 */

/**
 * User type for response
 * @typedef {Object} TUserResponse
 * @property {string} id - User id
 * @property {string} name - User name
 * @property {string} login - User login
 */
