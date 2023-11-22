import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateModule } from './generate/generate.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import { ProfileModule } from './profile/profile.module';
import { NextAuthModule } from './next-auth/next-auth.module';
import postgresConfig from '../dataSource/dataSource.config';
import { AuthSecretMiddleware } from './next-auth/middlewares/authSecret.middleware';
import { ConfigModule } from '@nestjs/config';
import { CityMiddleware } from './city/middlewares/city.middleware';
import { UserMiddleware } from './next-auth/middlewares/user.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresConfig),
    ProductModule,
    GenerateModule,
    CategoryModule,
    CityModule,
    ProfileModule,
    NextAuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthSecretMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(CityMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(UserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
