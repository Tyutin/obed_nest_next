import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(10000000)
  price: number;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100000)
  weight: number;

  @IsBoolean()
  published: boolean;

  @IsInt()
  @Min(1)
  categoryId: number;
}
