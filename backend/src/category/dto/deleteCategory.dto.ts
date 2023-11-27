import { DeleteProductDtoInterface } from '@shared/types/Product/DeleteProductDto.interface';
import { IsInt, Min } from 'class-validator';

export class DeleteCategoryDto implements DeleteProductDtoInterface {
  @IsInt()
  @Min(1)
  id: number;
}
