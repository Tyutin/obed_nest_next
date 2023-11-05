import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { GetProfileDto } from './dto/getProfile.dto';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
    this.profileService = profileService;
  }
  @Post('/profile')
  @UsePipes(new ValidationPipe())
  async createProfile(@Body('profile') createProductDto: CreateProfileDto) {
    const profile = await this.profileService.createProfile(createProductDto);
    return this.profileService.buildProfileResponse(profile);
  }
  @Post('/profile/get')
  @UsePipes(new ValidationPipe())
  async getProfile(@Body('profile') getProfileDto: GetProfileDto) {
    const profile = await this.profileService.getProfile(getProfileDto);
    return this.profileService.buildProfileResponse(profile);
  }
}
