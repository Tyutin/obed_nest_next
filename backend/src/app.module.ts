import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerateModule } from './generate/generate.module';
import { CategoryModule } from './category/category.module';
import { CityModule } from './city/city.module';
import postgresConfig from '../dataSource/dataSource.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresConfig),
    ProductModule,
    GenerateModule,
    CategoryModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
