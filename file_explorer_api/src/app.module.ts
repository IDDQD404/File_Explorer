import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/downloadFile', method: RequestMethod.GET },
        { path: '/streamVideo', method: RequestMethod.GET },
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('/');
  }
}
