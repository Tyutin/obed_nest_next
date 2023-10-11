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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    const product = new ProductEntity();
    Object.assign(product, createProductDto);

    const isExistingBySlug = await this.checkIsExistingBySlug(product.title);

    if (isExistingBySlug) {
      throw new HttpException(
        'Ошибка! Товар с таким названием или короткой ссылкой уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { slug, slugRu } = getSlugs(product.title);
    product.slug = slug;
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
      const { slug, slugRu } = getSlugs(product.title);
      product.slug = slug;
      product.slugRu = slugRu;
    }

    return await this.productRepository.save(product);
  }

  async getProductBySlug(slug: string): Promise<ProductEntity> {
    let product;
    if (/[a-zA-Z]/.test(slug)) {
      product = await this.productRepository.findOneBy({ slug });
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

  async checkIsExistingBySlug(checkingSlug: string): Promise<boolean> {
    const { slug, slugRu } = getSlugs(checkingSlug);
    const alreadyExistingBySlug = await this.productRepository.findOne({
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
}
