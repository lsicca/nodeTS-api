/**
 * @swagger
 * definitions:
 *  user:
 *    type: object
 *    properties:
 *      id:
 *        $ref: '#/parameters/user_id'
 *      email:
 *        $ref: '#/parameters/user_email'
 *      firstName:
 *        $ref: '#/parameters/user_firstName'
 *      lastName:
 *        $ref: '#/parameters/user_lastName'
 *      role:
 *        $ref: '#/parameters/user_role'
 *      createdAt:
 *        $ref: '#/parameters/createdAt'
 *    example:
 *      id: 3df5c10d-3f48-4d69-acdd-35636ea6aca0
 *      email: jthierry@isicca.fr
 *      firstName: Jacky
 *      lastName: Thierry
 *      role: user
 *      createdAt: 2021-01-01T12:00:00.000Z
 *  users:
 *    type: array
 *    items:
 *      $ref: '#/definitions/user'
 * responses:
 *  200_users:
 *    description: Success - Getting array of users
 *    schema:
 *      $ref: '#/definitions/users'
 *  200_user:
 *    description: Success - Getting a user
 *    schema:
 *      $ref: '#/definitions/user'
 * parameters:
 *  user_id:
 *    name: id
 *    description: User's unique Id
 *    in: formData
 *    required: true
 *    type: string
 *  user_email:
 *    name: email
 *    description: user's email
 *    in: formData
 *    required: true
 *    type: string
 *  user_password:
 *    name: password
 *    description: user's password
 *    in: formData
 *    required: true
 *    type: string
 *  user_firstName:
 *    name: firstName
 *    description: user's first name
 *    in: formData
 *    required: true
 *    type: string
 *  user_lastName:
 *    name: lastName
 *    description: user's last name
 *    in: formData
 *    required: true
 *    type: string
 *  user_role:
 *    name: role
 *    description: User's role
 *    in: formData
 *    type: string
 *  user_isActive:
 *    name: isActive
 *    description: User's active status
 *    in: formData
 *    type: boolean
 */

import { Sequelize, STRING, UUID, UUIDV4 } from 'sequelize';
import { UserAddModel, UserModel } from './user.interface';

module.exports = (sequelize: Sequelize) => {
	const User = sequelize.define<UserModel, UserAddModel>('User', {
		id: {
			type: UUID,
			defaultValue: UUIDV4,
			primaryKey: true,
		},
		email: {
			type: STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: STRING,
			allowNull: false,
		},
		firstName: {
			type: STRING,
			allowNull: false,
		},
		lastName: {
			type: STRING,
			allowNull: false,
		},
		passwordToken: { type: STRING, allowNull: true, defaultValue: null },
		role: {
			type: STRING,
			allowNull: true,
			validate: {
				isIn: [['user', 'admin']],
			},
			defaultValue: 'user',
		},
	});
	return User;
};
