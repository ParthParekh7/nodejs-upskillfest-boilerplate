// import { userService } from '../services';
import { errorLogger, hashPassword } from '../utils';
// import { userModel } from '../models';

import users from '../mock-data/users.json';
const getAllUsers = async (req, res) => {
	try {
		// const { query } = req;
		// const { totalCount, users } = await userService.findAllQuery(query);

		res.status(200).send({
			success: true,
			data: users,
			totalCount: users.length,
		});
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(400).send({
			success: false,
			message: error.message,
		});
	}
};

export default { getAllUsers };
