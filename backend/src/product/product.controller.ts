import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseInterface } from './types/productResponseInterface';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { AdminOrSecretGuard } from 'src/next-auth/guards/adminOrSecret.guard';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {
    this.productService = productService;
  }

  @Post('/product')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async createProduct(
    @Body('product') createProductDto: CreateProductDto,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.createProduct(createProductDto);
    return this.productService.buildProductResponse(product);
  }

  @Get('/product/:slug')
  async getProduct(
    @Param('slug') slug: string,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.getProductBySlug(slug);
    return this.productService.buildProductResponse(product);
  }

  @Put('/product')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async updateProduct(
    @Body('product') updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseInterface> {
    const product = await this.productService.updateProduct(updateProductDto);
    return this.productService.buildProductResponse(product);
  }
}
