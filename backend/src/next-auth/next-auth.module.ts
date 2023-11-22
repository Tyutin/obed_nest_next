import { Module } from '@nestjs/common';
import { NextAuthController } from './next-auth.controller';
import { NextAuthService } from './next-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccountEntity,
  SessionEntity,
  UserEntity,
  VerificationTokenEntity,
} from './nextAuth.entity';
import { ProfileEntity } from 'src/profile/profile.entity';
import { CityService } from 'src/city/city.service';
import { CityEntity } from 'src/city/city.entity';

@Module({
  controllers: [NextAuthController],
  providers: [NextAuthService, CityService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AccountEntity,
      SessionEntity,
      VerificationTokenEntity,
      ProfileEntity,
      CityEntity,
    ]),
  ],
  exports: [NextAuthService],
})
export class NextAuthModule {}
