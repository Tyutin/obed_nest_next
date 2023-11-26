import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CreateCategoryDtoInterface } from '@shared/types/Category/CreateCategoryDto.interface';

export class CreateCategoryDto implements CreateCategoryDtoInterface {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  cityId: number;

  @IsBoolean()
  @IsNotEmpty()
  published: boolean;
}
