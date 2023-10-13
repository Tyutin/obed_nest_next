import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { WorkHoursInterface } from '../types/workHours';
import { DeliveryZoneInterface } from '../types/deliveryZone';

export class CreateCityDto {
  @IsDate()
  @IsOptional()
  nextPayment: Date;

  @IsBoolean()
  @IsOptional()
  isWorking: boolean;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  slugRu: string;

  @IsString()
  @IsOptional()
  slugEn: string;

  @IsString()
  @IsOptional()
  companyName: string;

  @IsArray()
  @IsOptional()
  phones: string[];

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  vkLink: string;

  @IsString()
  @IsOptional()
  telegramLink: string;

  @IsString()
  @IsOptional()
  instagramLink: string;

  @IsString()
  @IsOptional()
  legalInfo: string;

  @IsInt()
  @Min(0)
  @Max(100000)
  @IsOptional()
  minimumOrderFrom: number;

  @IsInt()
  @Min(0)
  @Max(23)
  @IsOptional()
  newDayStartTime: number;

  @IsObject()
  @IsOptional()
  workHours: WorkHoursInterface;

  @IsArray()
  @IsOptional()
  deliveryZones: DeliveryZoneInterface[];

  @IsString()
  @IsOptional()
  shippingZoneMapLink: string;
}
