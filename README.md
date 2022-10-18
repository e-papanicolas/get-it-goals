## Description

A goals app to practice writing object oriented code in TypeScript.

## Technologies

- Typescript
- Nest.js

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Notes

For quickly creating a CRUD controller with the validation built-in, you may use the CLI's CRUD generator: `nest g resource [name]`

To create a controller using the CLI, simply execute the `nest g controller [name]` command.

To create a service using the CLI, simply execute the `nest g service [name]` command.

Controllers should handle HTTP requests and delegate more complex tasks to providers. Providers are plain JavaScript classes that are declared as providers in a module. Follow SOLID principles.

We need to register services with Nest so that it can perform the injection. We do this by editing our module file (`app.module.ts`) and adding the service to the providers array of the `@Module()` decorator.

The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies.

When you want to provide a set of providers which should be available everywhere out-of-the-box (e.g., helpers, database connections, etc.), make the module global with the `@Global()` decorator.

You implement custom Nest middleware in either a function, or in a class with an` @Injectable()` decorator. The class should implement the NestMiddleware interface, while the function does not have any special requirements.

The `configure()` method can be made asynchronous using `async/await` (e.g., you can `await` completion of an asynchronous operation inside the `configure()` method body).

The `MiddlewareConsumer` is a helper class. It provides several built-in methods to manage middleware. All of them can be simply chained in the fluent style. The `forRoutes()` method can take a single string, multiple strings, a `RouteInfo` object, a controller class and even multiple controller classes. In most cases you'll probably just pass a list of controllers separated by commas.

Consider using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.

In order to bind multiple middleware that are executed sequentially, simply provide a comma separated list inside the apply() method.

Global middleware: If we want to bind middleware to every registered route at once, we can use the use() method that is supplied by the INestApplication instance

```typescript
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

Accessing the DI container in a global middleware is not possible. You can use a functional middleware instead when using app.use(). Alternatively, you can use a class middleware and consume it with .forRoutes('\*') within the AppModule (or any other module).
