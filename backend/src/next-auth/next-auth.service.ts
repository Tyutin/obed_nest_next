import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountEntity,
  SessionEntity,
  UserEntity,
  VerificationTokenEntity,
} from './nextAuth.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/profile/profile.entity';
import { CityEntity } from 'src/city/city.entity';
// import { AddAdminToCityDto } from './dto/addAdminToCity.dto';

@Injectable()
export class NextAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @InjectRepository(VerificationTokenEntity)
    private readonly verificationTokenRepository: Repository<VerificationTokenEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async getUserBySessionToken(token: string): Promise<UserEntity | null> {
    const session = await this.sessionRepository.findOne({
      where: {
        sessionToken: token,
      },
      relations: {
        user: true,
      },
    });
    if (!session || !session.user) {
      return null;
    }
    return session.user;
  }

  async getUserByVkId(vkId: string): Promise<UserEntity> {
    const account = await this.accountRepository.findOne({
      where: {
        provider: 'vk',
        providerAccountId: vkId,
      },
      relations: {
        user: true,
      },
    });

    if (!account || !account.user) {
      throw new UnprocessableEntityException();
    }
    return account.user;
  }

  async addAdminToCity(
    user: UserEntity,
    city: CityEntity,
  ): Promise<UserEntity> {
    const userIsNotAdmin =
      user.adminForCities.findIndex(
        (administatingCity) => administatingCity.id === city.id,
      ) === -1;
    if (!userIsNotAdmin) {
      throw new UnprocessableEntityException();
    }
    user.adminForCities.push(city);
    return await this.userRepository.save(user);
  }

  async removeAdminFromCity(
    user: UserEntity,
    city: CityEntity,
  ): Promise<UserEntity> {
    const administatingCityIndex = user.adminForCities.findIndex(
      (administatingCity) => administatingCity.id === city.id,
    );
    if (administatingCityIndex < 0) {
      throw new UnprocessableEntityException();
    }
    user.adminForCities.splice(administatingCityIndex, 1);
    return await this.userRepository.save(user);
  }
}
