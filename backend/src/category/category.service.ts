import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { getSlugs } from 'tools/getSlugs';
import { CategoryResponseInterface } from './types/categoryResponseInterface';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    Object.assign(category, createCategoryDto);

    const isExistingBySlug = await this.checkIsExistingBySlug(category.title);
    if (isExistingBySlug) {
      throw new HttpException(
        'Ошибка! Категория с таким названием или короткой ссылкой уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const { slug, slugRu } = getSlugs(category.title);
    category.slug = slug;
    category.slugRu = slugRu;
    return await this.categoryRepository.save(category);
  }

  async checkIsExistingBySlug(checkingSlug: string): Promise<boolean> {
    const { slug, slugRu } = getSlugs(checkingSlug);
    const alreadyExistingBySlug = await this.categoryRepository.findOne({
      where: [
        {
          slug: slug,
        },
        {
          slugRu: slugRu,
        },
      ],
    });
    return !!alreadyExistingBySlug;
  }

  async getCategoryBySlug(slug: string): Promise<CategoryEntity> {
    let category;
    if (/[a-zA-Z]/.test(slug)) {
      category = await this.categoryRepository.findOneBy({ slug });
    } else {
      category = await this.categoryRepository.findOneBy({ slugRu: slug });
    }

    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const oldCategory = await this.categoryRepository.findOneBy({
      id: updateCategoryDto.id,
    });
    if (!oldCategory) {
      throw new NotFoundException();
    }

    if (
      updateCategoryDto.title &&
      oldCategory.title !== updateCategoryDto.title
    ) {
      const isExistingBySlug = await this.checkIsExistingBySlug(
        updateCategoryDto.title,
      );
      if (isExistingBySlug) {
        throw new HttpException(
          'Ошибка! Товар с таким названием или короткой ссылкой уже существует',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const category = new CategoryEntity();
    Object.assign(category, oldCategory, updateCategoryDto);
    if (
      updateCategoryDto.title &&
      oldCategory.title !== updateCategoryDto.title
    ) {
      const { slug, slugRu } = getSlugs(category.title);
      category.slug = slug;
      category.slugRu = slugRu;
    }

    return await this.categoryRepository.save(category);
  }

  buildCategoryResponse(category: CategoryEntity): CategoryResponseInterface {
    return {
      category,
    };
  }
}
