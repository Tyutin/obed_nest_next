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
import { CityEntity } from 'src/city/city.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    Object.assign(category, createCategoryDto);

    const isExistingBySlug = await this.checkIsExistingBySlug(
      category.title,
      createCategoryDto.cityId,
    );
    if (isExistingBySlug) {
      throw new HttpException(
        'Ошибка! Категория с таким названием или короткой ссылкой уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const city = await this.cityRepository.findOneBy({
      id: createCategoryDto.cityId,
    });
    if (!city) {
      throw new HttpException(
        'Ошибка! Выбранный город для категории не сущестувет',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    category.city = city;
    const { slugEn, slugRu } = getSlugs(category.title);
    category.slugEn = slugEn;
    category.slugRu = slugRu;
    return await this.categoryRepository.save(category);
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const oldCategory = await this.categoryRepository.findOneBy({
      id: updateCategoryDto.id,
    });
    if (!oldCategory) {
      throw new HttpException(
        'Ошибка! Категория не найдена',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (
      updateCategoryDto.title &&
      oldCategory.title !== updateCategoryDto.title
    ) {
      const isExistingBySlug = await this.checkIsExistingBySlug(
        updateCategoryDto.title,
        oldCategory.city.id,
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
      const { slugEn, slugRu } = getSlugs(category.title);
      category.slugEn = slugEn;
      category.slugRu = slugRu;
    }

    return await this.categoryRepository.save(category);
  }

  async getCategoryBySlug(slug: string): Promise<CategoryEntity> {
    let category;
    if (/[a-zA-Z]/.test(slug)) {
      category = await this.categoryRepository.findOneBy({ slugEn: slug });
    } else {
      category = await this.categoryRepository.findOneBy({ slugRu: slug });
    }

    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async checkIsExistingBySlug(
    checkingSlug: string,
    cityId: number,
  ): Promise<boolean> {
    const { slugEn, slugRu } = getSlugs(checkingSlug);
    const alreadyExistingBySlug = await this.categoryRepository.findOne({
      where: [
        {
          slugEn,
          city: {
            id: cityId,
          },
        },
        {
          slugRu,
          city: {
            id: cityId,
          },
        },
      ],
    });
    return !!alreadyExistingBySlug;
  }

  buildCategoryResponse(category: CategoryEntity): CategoryResponseInterface {
    return {
      category,
    };
  }
}
