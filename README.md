# NodeTS API

## Description

- This project is a boilerplate API
- Follows a DDD approach with clean architecture
- Developped in Javascript with Node, Express, Typescript and a postgresql database
- ORM (Sequelize) for requesting database
- Format validations with JOI
- Different environnement configurations
- OpenAPI Swagger documentation
- Automated unit and integration tests with Jest & Supertest
- ES6 syntax with await / async functions
- KISS & DRY practices

## How to install

- `git clone https://github.com/lsicca/nodeTS-API.git`
- `cd nodeTS-api`
- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`
- `export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"`
- `nvm install 15 & nvm use 15`
- `apt install g++ make`
- `npm install -g nodemon sequelize-cli`
- `npm install`
- `cp config/template config/development.env`
- Created an user in postgresql with username and password specified in config file in the step above `create user "${username}" with encrypted password '${password}' CREATEDB;`
- Fill all values in file `config/development.env` and `package.json`
- Change default values according to your needs in `config/default.json`
- `npm db:create:dev`
- `npm run db:migrate:dev`
- `npm run db:seed:dev`
- `npm run compile`
- `npm start`

## How to test

- `cp config/template config/test.env`
- Created an user in postgresql with username and password specified in config file in the step above `create user "${username}" with encrypted password '${password}' CREATEDB;`
- Fill all values in file `config/test.env` and `package.json`
- `npm run db:create:test`
- `npm run test`

## How to check Swagger documentation

The swagger is available if the value `SWAGGER_ENABLED` situated in `config/development.json` is equal to true, at the following path : `http://localhost:3001/swagger.json`
Once you get it, you can copy the json content and paste it in your local swagger editor or the one provided by openAPI at `https://editor.swagger.io`

## Linter

Eslint & Prettier are both installed and configured in the project.

- Eslint detects and displays warnings & errors in your code, according to the development best practices. It does not test if your code runs successfully, it just checks if your code follows correctly a set of rules defined in the .`eslintrc.json` configuration file.
- Prettier reformats your code your code according to a set of rules defined in the `.prettierrc.json` configuration file. It is launch automatically by Eslint.

You can start prettier & eslint with the following command :
`npm run eslint`

This project use the following EOL (End Of Line) : \n (also called LF). This is the default Unix EOL, if you are under windows environnement, change your editor EOL option to \n (File / Preferences / Settings / files.EOL with VsCode)

**Make sure to launch Eslint and have 0 problem & 0 warning before any commit.**
