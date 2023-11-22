// import {
//   HttpException,
//   HttpStatus,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { Repository } from 'typeorm';
// import { CreateProfileDto } from './dto/createProfile.dto';
import { ProfileResponseInterface } from './types/profileResponseInterface';
import { CityEntity } from 'src/city/city.entity';
// import { GetProfileDto } from './dto/getProfile.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  // async createProfile(
  //   createProfileDto: CreateProfileDto,
  // ): Promise<ProfileEntity> {
  //   const profile = new ProfileEntity();
  //   Object.assign(profile, createProfileDto);

  //   const city = await this.cityRepository.findOneBy({
  //     id: createProfileDto.cityId,
  //   });

  //   if (!city) {
  //     throw new HttpException(
  //       'Ошибка! Выбранный город не существует' + createProfileDto.cityId,
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }

  //   profile.city = city;

  //   const alreadyExistingProfile = await this.profileRepository.findOne({
  //     where: {
  //       city: {
  //         id: createProfileDto.cityId,
  //       },
  //       vkId: createProfileDto.vkId,
  //     },
  //   });

  //   if (alreadyExistingProfile) {
  //     throw new HttpException(
  //       'Ошибка! Профиль пользователя уже существует в этом городе',
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }

  //   return await this.profileRepository.save(profile);
  // }

  // async getProfile(getProfileDto: GetProfileDto): Promise<ProfileEntity> {
  //   const profile = await this.profileRepository.findOne({
  //     where: {
  //       vkId: getProfileDto.vkId,
  //       city: {
  //         id: getProfileDto.cityId,
  //       },
  //     },
  //   });

  //   if (!profile) {
  //     throw new NotFoundException();
  //   }
  //   return profile;
  // }

  buildProfileResponse(profile: ProfileEntity): ProfileResponseInterface {
    return {
      profile,
    };
  }
}
