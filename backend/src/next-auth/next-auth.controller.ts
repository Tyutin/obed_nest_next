import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { NextAuthService } from './next-auth.service';
import { AuthSecretGuard } from './guards/authSecret.guard';
import { CityService } from 'src/city/city.service';

@Controller('auth')
export class NextAuthController {
  constructor(
    private readonly nextAuthService: NextAuthService,
    private readonly cityService: CityService,
  ) {
    this.nextAuthService = nextAuthService;
  }

  @Post('/add-admin-to-city/:vkIdSlug/:cityNameSlug')
  @UseGuards(AuthSecretGuard)
  async addAdmin(
    @Param('vkIdSlug') vkIdSlug: string,
    @Param('cityNameSlug') cityNameSlug: string,
  ) {
    const city = await this.cityService.getCityBySlug(cityNameSlug);
    const user = await this.nextAuthService.getUserByVkId(vkIdSlug);

    return await this.nextAuthService.addAdminToCity(user, city);
  }

  @Post('/remove-admin-from-city/:vkIdSlug/:cityNameSlug')
  @UseGuards(AuthSecretGuard)
  async removeAdmin(
    @Param('vkIdSlug') vkIdSlug: string,
    @Param('cityNameSlug') cityNameSlug: string,
  ) {
    const city = await this.cityService.getCityBySlug(cityNameSlug);
    const user = await this.nextAuthService.getUserByVkId(vkIdSlug);

    return await this.nextAuthService.removeAdminFromCity(user, city);
  }
}
