'use server'

import { fetchData } from '@fetch/fetchData';
import { UpdateProductDtoInterface } from '../../../../../../../shared/types/Product/UpdateProductDto.interface';
import { CreateProductDtoInterface } from '../../../../../../../shared/types/Product/CreateProductDto.interface';

export async function updateProductAction(product: UpdateProductDtoInterface) {
  return await fetchData.product.updateProduct(product)
}

export async function createProductAction(product: CreateProductDtoInterface) {
  return await fetchData.product.createProduct(product)
}
