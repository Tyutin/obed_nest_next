import { IsInt, Min } from 'class-validator';
import { CreateCityDto } from './createCity.dto';

export class UpdateCityDto extends CreateCityDto {
  @IsInt()
  @Min(1)
  cityId: number;
}
