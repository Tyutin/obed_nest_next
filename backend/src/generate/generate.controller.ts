import { Controller, Post } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dto/createProduct.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/createCategory.dto';

@Controller('generate')
export class GenerateController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {
    this.productService = productService;
    this.categoryService = categoryService;
  }

  @Post('/seed')
  async createAll() {
    const category = await this.createCategory();
    await this.createProduct();
    return category;
  }

  @Post('/product')
  async createProduct() {
    const product: CreateProductDto = {
      title: 'Макароны',
      price: 100,
      image: '',
      description: 'Макароны очень вкусные',
      published: true,
      weight: 150,
      categoryId: 1,
    };
    const newProduct = this.productService.createProduct(product);
    return newProduct;
  }

  @Post('/category')
  async createCategory() {
    const category: CreateCategoryDto = {
      title: 'Вторые блюда',
    };
    const newCategory = this.categoryService.createCategory(category);
    return newCategory;
  }
}
