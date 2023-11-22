import {
  Body,
  Controller,
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

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  @Post('/category')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async createCategory(
    @Body('category') createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseInterface> {
    const category =
      await this.categoryService.createCategory(createCategoryDto);
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
}
