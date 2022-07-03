import { userModel } from '../models';
import { errorLogger, verifyJWT } from '../utils';
const { google } = require('googleapis');
const OAuth2Data = require('../config/goggleKey.json');

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const authorization = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw new Error('Access denied. No token provided');
		const token =
			authorization && authorization.startsWith('Bearer ') ? authorization.slice(7, authorization.length) : null;
		const ticket = await oAuth2Client.verifyIdToken({ idToken: token, audience: CLIENT_ID });
		if (!ticket) throw new Error('Invalid Token');
		next();
	} catch (error) {
		errorLogger(error.message, req.originalUrl);
		res.status(403).send({ success: false, message: error.message });
	}
};

export default authorization;
