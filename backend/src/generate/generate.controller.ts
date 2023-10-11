import { Controller, Post } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dto/createProduct.dto';

@Controller('generate')
export class GenerateController {
  constructor(
    private readonly generateService: GenerateService,
    private readonly productService: ProductService,
  ) {
    this.generateService = generateService;
    this.productService = productService;
  }

  @Post('/product')
  async createProduct() {
    const product: CreateProductDto = {
      title: 'Новый продукт',
      price: 100,
      image: '',
      description: 'description',
      published: true,
      weight: 150,
    };
    const newProduct = this.productService.createProduct(product);
    return newProduct;
  }
}
