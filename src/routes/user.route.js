import express from 'express';

import { userController } from '../controllers';

export default express
	.Router()
	/**
	 * @swagger
	 * /api/v1/users:
	 *   get:
	 *     description: Get all Users
	 *     responses:
	 *       200:
	 *         description: Success
	 *
	 */
	.get('/', userController.getAllUsers);
