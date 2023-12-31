import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductResponseInterface } from './types/productResponseInterface';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { getSlugs } from 'tools/getSlugs';
import { CategoryEntity } from 'src/category/category.entity';
import { bannedSlugs } from 'src/constants';
import { DeleteProductDto } from './dto/deleteProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const product = new ProductEntity();
    Object.assign(product, createProductDto);

    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });
    if (!category) {
      throw new HttpException(
        'Ошибка! Выбранная для товара категория не существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isExistingBySlug = await this.checkIsExistingBySlug(
      product.title,
      category,
    );
    if (isExistingBySlug) {
      throw new HttpException(
        'Ошибка! Товар с таким названием или короткой ссылкой уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    product.category = category;

    const city = (
      await this.categoryRepository.findOne({
        relations: { city: true },
        where: {
          id: category.id,
        },
      })
    ).city;

    product.city = city;

    const { slugEn, slugRu } = getSlugs(product.title);
    product.slugEn = slugEn;
    product.slugRu = slugRu;

    return await this.productRepository.save(product);
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const oldProduct = await this.productRepository.findOne({
      where: {
        id: updateProductDto.id,
      },
      relations: {
        category: true,
      },
    });
    if (!oldProduct) {
      throw new NotFoundException();
    }

    if (updateProductDto.title && updateProductDto.title !== oldProduct.title) {
      const isExistingBySlug = await this.checkIsExistingBySlug(
        updateProductDto.title,
        oldProduct.category,
      );
      if (isExistingBySlug && oldProduct.title !== updateProductDto.title) {
        throw new HttpException(
          'Ошибка! Товар с таким названием или короткой ссылкой уже существует',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const product = new ProductEntity();
    Object.assign(product, oldProduct, updateProductDto);
    if (updateProductDto.title) {
      const { slugEn, slugRu } = getSlugs(product.title);
      product.slugEn = slugEn;
      product.slugRu = slugRu;
    }

    return await this.productRepository.save(product);
  }

  async deleteProduct(
    deleteProductDto: DeleteProductDto,
  ): Promise<CategoryEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id: deleteProductDto.id,
      },
      relations: {
        category: true,
      },
    });
    if (!product) {
      throw new HttpException(
        'Ошибка! Товар не существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const categoryId = product.category.id;
    await this.productRepository.delete({ id: deleteProductDto.id });
    return await this.categoryRepository.findOneBy({ id: categoryId });
  }

  async getProductBySlug(slug: string): Promise<ProductEntity> {
    let product;
    if (/[a-zA-Z]/.test(slug)) {
      product = await this.productRepository.findOneBy({ slugEn: slug });
    } else {
      product = await this.productRepository.findOneBy({ slugRu: slug });
    }

    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  buildProductResponse(product: ProductEntity): ProductResponseInterface {
    delete product.category;
    delete product.city;
    return {
      product,
    };
  }

  checkIsExistingBySlug(title: string, category: CategoryEntity): boolean {
    const { slugEn, slugRu } = getSlugs(title);
    const existingIndex = category.products.findIndex(
      (product) => product.slugEn === slugEn || product.slugRu === slugRu,
    );
    return (
      existingIndex !== -1 ||
      bannedSlugs.includes(slugEn) ||
      bannedSlugs.includes(slugRu)
    );
  }
}
