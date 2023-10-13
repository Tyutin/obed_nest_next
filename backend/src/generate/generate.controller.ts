import { Controller, Param, Post } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dto/createProduct.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/createCategory.dto';
import { CreateCityDto } from 'src/city/dto/createCity.dto';
import { CityService } from 'src/city/city.service';

@Controller('generate')
export class GenerateController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly cityService: CityService,
  ) {
    this.productService = productService;
    this.categoryService = categoryService;
    this.cityService = cityService;
  }

  @Post('/seed/:cityName')
  async createAll(@Param('cityName') cityName: string) {
    const city = await this.createCity(cityName);
    const category = await this.createCategory(city.id);
    await this.createProduct(category.id, 'Макарошки');
    await this.createProduct(category.id, 'Пюрешка');
    return city;
  }

  @Post('/city')
  async createCity(cityName?: string) {
    const newCity = this.cityService.createCity(
      cityName ? ({ city: cityName } as CreateCityDto) : ({} as CreateCityDto),
    );
    return newCity;
  }

  @Post('/category')
  async createCategory(cityId?: number) {
    const category: CreateCategoryDto = {
      title: 'Вторые блюда',
      cityId: cityId || 1,
    };
    const newCategory = this.categoryService.createCategory(category);
    return newCategory;
  }

  @Post('/product')
  async createProduct(categoryId?: number, title?: string) {
    const product: CreateProductDto = {
      title: title || 'Макароны',
      price: 100,
      image: '',
      description: 'Макароны очень вкусные',
      published: true,
      weight: 150,
      categoryId: categoryId || 1,
    };
    const newProduct = this.productService.createProduct(product);
    return newProduct;
  }
}
