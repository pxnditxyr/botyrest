# 🐼 BotyRest

<p align="center">
  <strong>A NestJS-inspired, decorator-based framework for REST APIs on Fastify and TypeScript.</strong><br />
  Controllers, modules and DTO validation, with sensible security defaults out of the box.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/botyrest"><img alt="npm" src="https://img.shields.io/npm/v/botyrest?style=for-the-badge&logo=npm&label=botyrest" /></a>
  <img alt="Fastify" src="https://img.shields.io/badge/Fastify-4-000000?style=for-the-badge&logo=fastify&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-decorators-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-success?style=for-the-badge" />
</p>

---

## ✨ What is BotyRest?

BotyRest is my own framework, written in 2023 and inspired by NestJS. You write plain classes, mark methods with decorators, and BotyRest turns them into [Fastify](https://fastify.dev/) routes.

It is published on npm as two packages:

| Package | What it is |
| --- | --- |
| [`botyrest`](https://www.npmjs.com/package/botyrest) | The framework (this repository) |
| [`botyrest-cli`](https://www.npmjs.com/package/botyrest-cli) | A CLI that scaffolds a project, source in [`botyrest-cli`](https://github.com/pxnditxyr/botyrest-cli) |

## 📦 Install

```bash
npm install botyrest
```

Your `tsconfig.json` needs `experimentalDecorators` and `emitDecoratorMetadata` set to `true`.

## 🧩 What it gives you

### Decorators

| Decorator | What it does |
| --- | --- |
| `@Module({ controllers })` | Registers the routes of a controller on the server when the module is created |
| `@Get(param?)` | `GET` route. With `':term'` the value reaches your method. A `null` result becomes a `404`, a thrown error becomes a `500` |
| `@Post(param?)` | `POST` route. The body is validated against the DTO class of the first parameter. Invalid body: `400` with the messages. Success: `201` |
| `@Patch(param?)` | `PATCH` route. Expects an `:id` that is a valid UUID, validates the body against the DTO and answers `200`, or `404` when the record does not exist |
| `@Delete(param?)` | `DELETE` route. Expects an `:id` that is a valid UUID and answers `204`, or `404` when the record does not exist |
| `PartialType(Dto)` | Builds a DTO where every field is optional, handy for updates |

Routes are prefixed with the controller name in lowercase, without the word `Controller`. For example, `UsersController` serves `/users`.

### Server

`BotyRestServer` is a Fastify server configured with:

- **CORS**, using the `origin` you pass in
- **Helmet** security headers
- **Rate limiting**: 100 requests per minute by default, configurable with `rateLimitOptions`, and a stricter limit on the 404 handler
- **Form body** parsing and **middie** for Express-style middleware
- **Static files** served from `public/`, with a home page at `/`

```ts
const server = new BotyRestServer({ port: 3000, origin: '*' })
```

### Extras

- `Logger`: colored console output with `log`, `warn` and `error`
- Ready-made error bodies: `response400`, `response401`, `response403`, `response404` and `response500`
- `class-validator` messages converted into a clean list of errors

## ⚠️ Known limitations

These come straight from the source and are the next things I would fix:

- `@Module` wires only the **first** controller in `controllers`.
- Every method of a controller must carry an HTTP decorator, because `@Module` calls each one to build its route.
- `providers`, `imports` and `exports` exist in the module options, but there is no dependency injection yet.

## 🗂️ Project structure

```text
src/
├── decorators/    @Module, @Get, @Post, @Patch, @Delete, PartialType
├── server/        BotyRestServer (Fastify setup and security defaults)
├── responses/     Standard error bodies
├── logger/        Console logger
├── interfaces/    Server and module options
├── utils/         class-validator error conversion
└── public/        Default home page
```

## 🛠️ Develop

```bash
git clone https://github.com/pxnditxyr/botyrest.git
cd botyrest
npm install
npm run build:prod
```

The build compiles TypeScript to `dist/` and copies `src/public`. The `prepare` script runs it on install.

## 🗺️ Status

Version `0.1.1`, last updated in September 2023.

## 📄 License

MIT. See [LICENSE](./LICENSE).

---

Made by [**Pxndxs**](https://github.com/pxnditxyr) 🐼
