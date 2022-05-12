# NodeJS - Starter | Intermediate | Advanced Boilerplate

## Folder Structure
```
├── src
│   ├── config
│   │   ├── .env
│   │   ├── env.example
│   │   ├── dbConnection.js
│   ├── controllers
│   │   ├── index.js
│   │   ├── user.controller.js
│   ├── middlewares
│   │   ├── index.js
│   │   ├── authorization.js
│   ├── models
│   │   ├── index.js
│   │   ├── user.model.js
│   ├── routes
│   │   ├── index.js
│   │   ├── user.route.js
│   ├── services
│   │   ├── index.js
│   │   ├── user.services.js
│   ├── utils
│   │   ├── index.js
│   │   ├── hashPassword.js
│   │   ├── logger.js
│   │   ├── errorLogger.js
├── logs
├── dist
├── node_modules
├── .babelrc
└── .gitignore
├── .prettierrc
├── LICENCE
├── package.json
├── README.md
├── server.js 
```

### Steps Run Project 

1. npm install or yarn
2. Set environment variables from `src/config/.env-example` into `src/config/.env`
```
NODE_ENV=development
PROJECT_NAME='nodejs-starter'
DB_ENV=dev
PORT=5000
LOG_PATH=logs
HOST=localhost
CONNECTION_URL=mongodb://localhost:27017/
DATABASE_NAME=nodejs-starter
```
3. Execute command `npm run start:server` or `yarn start:server`