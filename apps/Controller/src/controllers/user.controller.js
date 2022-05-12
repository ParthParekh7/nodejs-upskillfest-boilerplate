import { userService } from '../services';
import { errorLogger, hashPassword } from '../utils';
import { userModel } from '../models';

import users from '../mock-data/users.json';
const getAllUsers = async (req, res) => {
	try {
		// const { query } = req;
		// const { totalCount, users } = await userService.findAllQuery(query);
		console.log("data: ");
		
		const filter = {};
		const data = await userModel.find(filter);
		console.log("data: ", data);
		res.status(200).send({
			success: true,
			data: data,
			totalCount: data.length,
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

const createUser = async (req, res) => {
	try {
		console.log("req.body: ", req.body)
		const result = await userService.create(req.body);
		console.log("result: ", result);
		res.status(200).send({
			success: true,
			data: result
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

export default { getAllUsers, createUser };
