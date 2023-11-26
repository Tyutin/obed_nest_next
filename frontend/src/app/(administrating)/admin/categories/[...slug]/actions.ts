'use server'

import { fetchData } from '@fetch/fetchData';
import { UpdateProductDtoInterface } from '@shared/types/Product/UpdateProductDto.interface';
import { CreateProductDtoInterface } from '@shared/types/Product/CreateProductDto.interface';
import { CreateCategoryDtoInterface } from '@shared/types/Category/CreateCategoryDto.interface';
import { UpdateCategoryDtoInterface } from '@shared/types/Category/UpdateCategoryDto.interface';

export async function updateProductAction(product: UpdateProductDtoInterface) {
  return await fetchData.product.updateProduct(product)
}

export async function createProductAction(product: CreateProductDtoInterface) {
  return await fetchData.product.createProduct(product)
}

export async function createCategoryAction(category: CreateCategoryDtoInterface) {
  return await fetchData.category.createCategory(category)
}

export async function updateCategoryAction(category: UpdateCategoryDtoInterface) {
  return await fetchData.category.updateCategory(category)
}
