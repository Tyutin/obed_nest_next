import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { UpdateCategoryDtoInterface } from '@shared/types/Category/UpdateCategoryDto.interface';

export class UpdateCategoryDto implements UpdateCategoryDtoInterface {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsBoolean()
  @IsOptional()
  published: boolean;
}
