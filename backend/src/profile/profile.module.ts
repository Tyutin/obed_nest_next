import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { CityEntity } from 'src/city/city.entity';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [TypeOrmModule.forFeature([ProfileEntity, CityEntity])],
})
export class ProfileModule {}
