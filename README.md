## Description

A goals app to practice writing object oriented code in TypeScript.

## Technologies

- Typescript
- Nest.js | back end framework
- Jest | testing
- Docker | database container
- PostgreSQL | relational database
- TypeORM | typescript object relational mapper

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

In order to bind multiple middleware that are executed sequentially, simply provide a comma separated list inside the `apply()` method.

Global middleware: If we want to bind middleware to every registered route at once, we can use the `use()` method that is supplied by the `INestApplication` instance

```typescript
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

Accessing the DI container in a global middleware is not possible. You can use a functional middleware instead when using `app.use()`. Alternatively, you can use a class middleware and consume it with `.forRoutes('\*')` within the `AppModule` (or any other module).

All exception filters should implement the generic `ExceptionFilter<T>` interface. This requires you to provide the catch`(exception: T, host: ArgumentsHost)` method with its indicated signature. `T` indicates the type of the exception. The `@Catch()` decorator may take a single parameter, or a comma-separated list. This lets you set up the filter for several types of exceptions at once.

Prefer applying filters by using classes instead of instances when possible. It reduces memory usage since Nest can easily reuse instances of the same class across your entire module. Exception filters can be scoped at different levels: method-scoped, controller-scoped, or global-scoped.

In order to catch every unhandled exception (regardless of the exception type), leave the `@Catch()` decorator's parameter list empty, e.g., `@Catch()`.

A pipe is a class annotated with the `@Injectable()` decorator, which implements the `PipeTransform` interface. Pipes have two typical use cases:

- transformation: transform input data to the desired form (e.g., from string to integer)
- validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

`PipeTransform<T, R>` is a generic interface that must be implemented by any pipe. The generic interface uses `T` to indicate the type of the input value, and `R` to indicate the return type of the `transform()` method.

Every pipe must implement the `transform()` method to fulfill the `PipeTransform` interface contract. This method has two parameters: `value` is the currently processed method argument (before it is received by the route handling method), `metadata` is the currently processed method argument's metadata, which has 3 properties: `type`, `metatype`, and `data`.

TypeScript interfaces disappear during transpilation. Thus, if a method parameter's type is declared as an interface instead of a class, the metatype value will be `Object`.

Since the `ValidationPipe` was created to be as generic as possible, we can realize it's full utility by setting it up as a global-scoped pipe so that it is applied to every route handler across the entire application.

A guard is a class annotated with the `@Injectable()` decorator, which implements the `CanActivate` interface.

Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. This is often referred to as authorization. Guards have access to the `ExecutionContext` instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and interceptors, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively.

Guards are executed after all middleware, but before any interceptor or pipe.

Nest provides the ability to attach custom metadata to route handlers through the `@SetMetadata()` decorator. This metadata supplies our missing role data, which a smart guard needs to make decisions.

An interceptor is a class annotated with the `@Injectable()` decorator and implements the `NestInterceptor` interface.

Interceptors have a set of useful capabilities which are inspired by the **Aspect Oriented Programming (AOP)** technique. They make it possible to:

- bind extra logic before / after method execution
- transform the result returned from a function
- transform the exception thrown from a function
- extend the basic function behavior
- completely override a function depending on specific conditions (e.g., for caching purposes)

The `NestInterceptor<T, R>` is a generic interface in which `T` indicates the type of an `Observable<T>` (supporting the response stream), and `R` is the type of the value wrapped by `Observable<R>`.

Interceptors, like controllers, providers, guards, and so on, can inject dependencies through their constructor.

Nest interceptors work with both synchronous and asynchronous `intercept()` methods. You can simply switch the method to `async` if necessary.

Interceptors have great value in creating re-usable solutions to requirements that occur across an entire application.

Nest is built around a language feature called decorators. An ES2016 decorator is an expression which returns a function and can take a target, name and property descriptor as arguments. You apply it by prefixing the decorator with an `@` character and placing this at the very top of what you are trying to decorate. Decorators can be defined for either a class, a method or a property.

For TypeScript users, note that `createParamDecorator<T>()` is a generic. This means you can explicitly enforce type safety, for example `createParamDecorator<string>((data, ctx) => ...)`. Alternatively, specify a parameter type in the factory function, for example `createParamDecorator((data: string, ctx) => ...)`. If you omit both, the type for data will be any.

## Docker

Start the PostgreSQL database in a Docker container by running `docker compose up` in the root directory.
