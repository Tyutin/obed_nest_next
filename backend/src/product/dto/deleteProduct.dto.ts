import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { DeleteProductDtoInterface } from '../../../../shared/types/Product/DeleteProductDto.interface';

export class DeleteProductDto implements DeleteProductDtoInterface {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  id: number;
}
