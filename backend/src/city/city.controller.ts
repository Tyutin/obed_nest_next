import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/createCity.dto';
import { CityResponseInterface } from './types/cityResponse.interface';
import { UpdateCityDto } from './dto/updateCity.dto';
import { AuthSecretGuard } from '../next-auth/guards/authSecret.guard';
import { AdminOrSecretGuard } from 'src/next-auth/guards/adminOrSecret.guard';
import { IsAdminOrSecret } from 'src/next-auth/decorators/isAdminOrSecret.decorator';

@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {
    this.cityService = cityService;
  }

  @Post('/city')
  @UseGuards(AuthSecretGuard)
  @UsePipes(new ValidationPipe())
  async createCity(
    @Body('city') createCityDto: CreateCityDto,
    @IsAdminOrSecret() isAdminOrSecret: boolean,
  ): Promise<CityResponseInterface> {
    const city = await this.cityService.createCity(createCityDto);
    return this.cityService.buildCityResponse(city, isAdminOrSecret);
  }

  @Put('/city')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async updateCity(
    @Body('city') updateCityLocalDto: UpdateCityDto,
    @IsAdminOrSecret() isAdminOrSecret: boolean,
  ): Promise<CityResponseInterface> {
    const city = await this.cityService.updateCityLocal(updateCityLocalDto);
    return this.cityService.buildCityResponse(city, isAdminOrSecret);
  }

  @Get('/city/:slug')
  async getCity(
    @Param('slug') slug: string,
    @IsAdminOrSecret() isAdminOrSecret: boolean,
  ): Promise<CityResponseInterface> {
    const city = await this.cityService.getCityBySlug(slug);
    return this.cityService.buildCityResponse(city, isAdminOrSecret);
  }
}
