import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AccountEntity,
  SessionEntity,
  UserEntity,
  VerificationTokenEntity,
} from './nextAuth.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/profile/profile.entity';

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
}
