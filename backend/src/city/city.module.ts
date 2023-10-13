import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';

@Module({
  controllers: [CityController],
  providers: [CityService],
  imports: [TypeOrmModule.forFeature([CityEntity])],
  exports: [CityService],
})
export class CityModule {}
