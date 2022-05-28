import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocs = YAML.load('./src/swagger/api-docs.yaml');

import { userRoute } from './src/routes';

/* Initialize Express Server */
const server = express();

/* DB connection */
import './src/config/dbConnection';

/* Environment Variables */
require('dotenv').config({ path: 'src/config/.env' });

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const BASE_API_URL = `http://${HOST}:${PORT}${'/api/v1'}`;

/** Middlewares */

// Parse Req.body
server.use(json());
server.use(urlencoded({ extended: true }));
// CORS
server.use(cors({ origin: true, credentials: true }));
// API LOG
server.use(morgan('dev'));
// XSS Attack Security
server.use(helmet());
// Compress Requests
server.use(compression());

/* Routes */
server.use('/api/v1/users', userRoute);

//Swagger Configuration
/* const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: process.env.PROJECT_NAME,
			version: '1.0.0',
		},
	},
	apis: ['src/routes/user.route.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions); */

server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/* Server Start Listening on PORT */
server.listen(PORT, () => {
	console.info('API Running at');
	console.info(`${'\tLocalhost:'} ${BASE_API_URL}`);
	console.info(`${'\tUsers:'} ${`${BASE_API_URL}/users`}`);
});
