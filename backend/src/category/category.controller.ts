import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CategoryResponseInterface } from './types/categoryResponseInterface';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { AdminOrSecretGuard } from 'src/next-auth/guards/adminOrSecret.guard';
import { City } from 'src/city/decorators/city.decorator';
import { CityEntity } from 'src/city/city.entity';
import { DeleteCategoryDto } from './dto/deleteCategory.dto';
import { CityResponseInterface } from 'src/city/types/cityResponse.interface';
import { CityService } from 'src/city/city.service';
import { IsAdminOrSecret } from 'src/next-auth/decorators/isAdminOrSecret.decorator';

@Controller()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly cityService: CityService,
  ) {
    this.categoryService = categoryService;
    this.cityService = cityService;
  }

  @Post('/category')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async createCategory(
    @Body('category') createCategoryDto: CreateCategoryDto,
    @City() city: CityEntity,
  ): Promise<CategoryResponseInterface> {
    const category = await this.categoryService.createCategory(
      createCategoryDto,
      city,
    );
    return this.categoryService.buildCategoryResponse(category);
  }

  @Get('/category/:slug')
  async getCategory(
    @Param('slug') slug: string,
  ): Promise<CategoryResponseInterface> {
    const category = await this.categoryService.getCategoryBySlug(slug);
    return this.categoryService.buildCategoryResponse(category);
  }

  @Put('/category')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async updateCategory(
    @Body('category') updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseInterface> {
    const category =
      await this.categoryService.updateCategory(updateCategoryDto);
    return this.categoryService.buildCategoryResponse(category);
  }

  @Delete('/category')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async deleteCategory(
    @Body('category') deleteCategoryDto: DeleteCategoryDto,
    @IsAdminOrSecret() isAdminOrSecret: boolean,
  ): Promise<CityResponseInterface> {
    const city = await this.categoryService.deleteCategory(deleteCategoryDto);
    return this.cityService.buildCityResponse(city, isAdminOrSecret);
  }
}
