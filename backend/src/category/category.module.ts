import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { CityEntity } from 'src/city/city.entity';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';
import { CityService } from 'src/city/city.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, ProductService, CityService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, CityEntity, ProductEntity]),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
