import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CityEntity } from 'src/city/city.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, CityEntity]),
  ],
  exports: [ProductService],
})
export class ProductModule {}
