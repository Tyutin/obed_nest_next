import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CreateProductDto } from 'src/product/dto/createProduct.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/createCategory.dto';
import { CreateCityDto } from 'src/city/dto/createCity.dto';
import { CityService } from 'src/city/city.service';
import { AuthSecretGuard } from 'src/next-auth/guards/authSecret.guard';

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
  @UseGuards(AuthSecretGuard)
  async createAll(@Param('cityName') cityName: string) {
    const city = await this.createCity(cityName);
    const category1 = await this.createCategory(city.id, 'Гарниры');
    await this.createProduct(category1.id, 'Макарошки');
    await this.createProduct(category1.id, 'Пюрешка');
    await this.createProduct(category1.id, 'Гречка');
    await this.createProduct(category1.id, 'Рагу из овощей');
    await this.createProduct(category1.id, 'Картофель по деревенски');
    const category2 = await this.createCategory(city.id, 'Супы');
    await this.createProduct(category2.id, 'Борщ');
    await this.createProduct(category2.id, 'Рассольник');
    await this.createProduct(category2.id, 'Щи');
    await this.createProduct(category2.id, 'Солянка');
    await this.createProduct(category2.id, 'Суп лапша с курицей');
    return city;
  }

  @Post('/city')
  @UseGuards(AuthSecretGuard)
  async createCity(cityName?: string) {
    const newCity = this.cityService.createCity(
      cityName ? ({ city: cityName } as CreateCityDto) : ({} as CreateCityDto),
    );
    return newCity;
  }

  @Post('/category')
  @UseGuards(AuthSecretGuard)
  async createCategory(cityId?: number, categoryName?: string) {
    const category: CreateCategoryDto = {
      title: categoryName || 'Вторые блюда',
      cityId: cityId || 1,
    };
    const newCategory = this.categoryService.createCategory(category);
    return newCategory;
  }

  @Post('/product')
  @UseGuards(AuthSecretGuard)
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
