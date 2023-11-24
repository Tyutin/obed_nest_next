import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UpdateProductDtoInterface } from '../../../../shared/types/Product/UpdateProductDto.interface';

export class UpdateProductDto implements UpdateProductDtoInterface {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(100000)
  weight: number;

  @IsDate()
  @IsOptional()
  startAvailableTime: Date;

  @IsDate()
  @IsOptional()
  endAvailableTime: Date;

  @IsBoolean()
  @IsOptional()
  published: boolean;

  @IsInt()
  @Min(1)
  @IsOptional()
  category: number;
}
