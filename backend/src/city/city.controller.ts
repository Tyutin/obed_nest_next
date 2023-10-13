import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/createCity.dto';
import { CityResponseInterface } from './types/cityResponse.interface';
import { UpdateCityDto } from './dto/updateCity.dto';

@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {
    this.cityService = cityService;
  }

  @Post('/city')
  @UsePipes(new ValidationPipe())
  async createCity(
    @Body('city') createCityDto: CreateCityDto,
  ): Promise<CityResponseInterface> {
    const city = await this.cityService.createCity(createCityDto);
    return this.cityService.buildCityResponse(city);
  }

  @Put('/city')
  @UsePipes(new ValidationPipe())
  async updateCity(
    @Body('city') updateCityLocalDto: UpdateCityDto,
  ): Promise<CityResponseInterface> {
    const city = await this.cityService.updateCityLocal(updateCityLocalDto);
    return this.cityService.buildCityResponse(city);
  }

  @Get('/city/:slug')
  async getCategory(
    @Param('slug') slug: string,
  ): Promise<CityResponseInterface> {
    const category = await this.cityService.getCityBySlug(slug);
    return this.cityService.buildCityResponse(category);
  }
}
