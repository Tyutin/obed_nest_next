import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class GetProfileDto {
  @IsInt()
  @IsNotEmpty()
  vkId: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  cityId: number;
}
