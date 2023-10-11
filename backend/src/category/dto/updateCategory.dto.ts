import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class UpdateCategoryDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
