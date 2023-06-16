# BotyRest | RestFul Api | Node Typescript

The project is a framework for creating RESTful APIs using Node.js and Fastify, written in TypeScript for safer and more scalable development. With this framework, you can quickly create a RESTful API that is easy to maintain and customize. Additionally, with the help of Fastify, your API will have excellent performance, ensuring a smooth and fast user experience.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installing

A step by step series of examples that tell you how to get a development env running.

1. Clone the repository with the command 

```bash
git clone https://github.com/pxnditxyr/botyrest.git
```

2. Run the command 
```bash
npm i
```

3. Change name of .env.example to .env
```
mv .env.example .env
```

### Running Database with Docker in Dev Mode

For running database you need 
```bash
docker compose up -d
```

### Running

For running the application in development mode, it's recommended to have two separate terminal windows running the following commands:

1. To transpile TypeScript files in watch mode.

```bash
npm run build:dev
```
2. To start the development server with file watch.

```bash
npm run start:dev
```

For running the application in production mode, run the command
To start the production server.

1. To transpile TypeScript files.

```bash
npm run build:prod
```
2. To start the server.

```bash
npm run start:prod
```


## Built With

* [Node.js](https://nodejs.org/)
* [Fastify](https://www.fastify.io/)
* [TypeScript](https://www.typescriptlang.org/)

## Authors

* **Pxndxs** - [Link to GitHub profile](https://github.com/pxnditxyr)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* Thank you to my 10 cats for keeping me company while coding.
