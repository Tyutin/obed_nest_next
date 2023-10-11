import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenerateService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async generateProduct() {
    const product = new ProductEntity();
    product.description = 'some description';
    product.image = 'someImage';
    product.price = 100;
    product.published = true;
    product.weight = 300;
    product.title = 'Новый продукт';
  }
}
