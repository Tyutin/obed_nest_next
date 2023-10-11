import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10000000)
  price: number;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
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
}
