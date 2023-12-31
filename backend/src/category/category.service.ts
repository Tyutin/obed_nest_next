import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { getSlugs } from 'tools/getSlugs';
import { CategoryResponseInterface } from './types/categoryResponseInterface';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CityEntity } from 'src/city/city.entity';
import { bannedSlugs } from 'src/constants';
import { DeleteCategoryDto } from './dto/deleteCategory.dto';
import { ProductEntity } from 'src/product/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    cityFromDecorator?: CityEntity,
  ): Promise<CategoryEntity> {
    const { title, cityId, published } = createCategoryDto;

    const city =
      cityFromDecorator ??
      (await this.cityRepository.findOneBy({
        id: Equal(cityId),
      }));
    if (!city) {
      throw new HttpException(
        'Ошибка! Выбранный город для категории не сущестувет',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isExistingBySlug = await this.checkIsExistingBySlug(title, city);
    if (isExistingBySlug) {
      throw new HttpException(
        'Ошибка! Категория с таким названием или короткой ссылкой уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { slugEn, slugRu } = getSlugs(title);
    const category = new CategoryEntity();
    Object.assign(category, { title, city, published, slugEn, slugRu });
    return await this.categoryRepository.save(category);
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const oldCategory = await this.categoryRepository.findOne({
      where: {
        id: updateCategoryDto.id,
      },
      relations: {
        city: true,
      },
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
        oldCategory.city,
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

  async deleteCategory(
    deleteCategoryDto: DeleteCategoryDto,
  ): Promise<CityEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: deleteCategoryDto.id,
      },
      relations: {
        city: true,
      },
    });
    if (!category) {
      throw new HttpException(
        'Ошибка! Категория не существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const deletePromises: Promise<void>[] = [];
    category.products.forEach((product) => {
      deletePromises.push(
        new Promise<void>(async (res) => {
          await this.productRepository.delete({ id: product.id });
          res();
        }),
      );
    });
    await Promise.all(deletePromises);
    const cityId = category.city.id;
    await this.categoryRepository.delete({ id: deleteCategoryDto.id });
    const city = this.cityRepository.findOneBy({ id: cityId });
    return city;
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

  checkIsExistingBySlug(title: string, city: CityEntity): boolean {
    const { slugEn, slugRu } = getSlugs(title);
    const existingIndex = city.categories.findIndex(
      (category) => category.slugEn === slugEn || category.slugRu === slugRu,
    );
    return (
      existingIndex !== -1 ||
      bannedSlugs.includes(slugEn) ||
      bannedSlugs.includes(slugRu)
    );
  }

  buildCategoryResponse(category: CategoryEntity): CategoryResponseInterface {
    delete category.city;
    if (!category.products) {
      category.products = [];
    }
    return {
      category,
    };
  }
}
