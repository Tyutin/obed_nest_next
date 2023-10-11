import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { GenerateService } from './generate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [GenerateController],
  providers: [GenerateService, ProductService],
  imports: [TypeOrmModule.forFeature([ProductEntity])],
})
export class GenerateModule {}
