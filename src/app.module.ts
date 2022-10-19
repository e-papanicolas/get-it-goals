import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UsersService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude('auth').forRoutes(UsersController);
    // OR:
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
