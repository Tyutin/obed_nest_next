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

    const isExistingBySlug = await this.checkIsExistingBySlug(
      product.title,
      createProductDto.categoryId,
    );

    if (isExistingBySlug) {
      throw new HttpException(
        'Ошибка! Товар с таким названием или короткой ссылкой уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });
    if (!category) {
      throw new HttpException(
        'Ошибка! Выбранная для товара категория не существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    product.category = category;

    const { slugEn, slugRu } = getSlugs(product.title);
    product.slugEn = slugEn;
    product.slugRu = slugRu;

    return await this.productRepository.save(product);
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const oldProduct = await this.productRepository.findOneBy({
      id: updateProductDto.id,
    });
    if (!oldProduct) {
      throw new NotFoundException();
    }

    if (updateProductDto.title) {
      const isExistingBySlug = await this.checkIsExistingBySlug(
        updateProductDto.title,
        oldProduct.category.id,
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
    return {
      product,
    };
  }

  async checkIsExistingBySlug(
    checkingSlug: string,
    categoryId: number,
  ): Promise<boolean> {
    const { slugEn, slugRu } = getSlugs(checkingSlug);
    const alreadyExistingBySlug = await this.productRepository.findOne({
      where: [
        {
          slugEn,
          category: {
            id: categoryId,
          },
        },
        {
          slugRu,
          category: {
            id: categoryId,
          },
        },
      ],
    });
    return !!alreadyExistingBySlug;
  }
}
