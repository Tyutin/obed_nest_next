import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { CategoryService } from 'src/category/category.service';
import { CategoryEntity } from 'src/category/category.entity';
import { CityService } from 'src/city/city.service';
import { CityEntity } from 'src/city/city.entity';

@Module({
  controllers: [GenerateController],
  providers: [ProductService, CategoryService, CityService],
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, CityEntity]),
  ],
})
export class GenerateModule {}
