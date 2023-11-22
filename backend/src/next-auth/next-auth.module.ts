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

@Module({
  controllers: [NextAuthController],
  providers: [NextAuthService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AccountEntity,
      SessionEntity,
      VerificationTokenEntity,
      ProfileEntity,
    ]),
  ],
  exports: [NextAuthService],
})
export class NextAuthModule {}
