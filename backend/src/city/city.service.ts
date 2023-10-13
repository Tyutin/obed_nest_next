import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/createCity.dto';
import { CityResponseInterface } from './types/cityResponse.interface';
import { UpdateCityDto } from './dto/updateCity.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async createCity(createCityDto: CreateCityDto): Promise<CityEntity> {
    if (createCityDto.city || createCityDto.slugEn || createCityDto.slugRu) {
      const alreadyExistingCity = await this.cityRepository.findOne({
        where: [
          {
            city: createCityDto.city,
          },
          {
            slugEn: createCityDto.slugEn,
          },
          {
            slugRu: createCityDto.slugRu,
          },
        ],
      });

      if (alreadyExistingCity) {
        throw new HttpException(
          'Ошибка! Город с таким названием или короткой ссылкой уже существует',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    const city = new CityEntity();
    Object.assign(city, createCityDto);
    return await this.cityRepository.save(city);
  }

  async updateCityLocal(updateCityDto: UpdateCityDto): Promise<CityEntity> {
    // TODO тут проверка какой админ обновляет данные, если локальный, то удаляем
    if (!process.env.LOGINBYLOCALADMIN) {
      delete updateCityDto.city;
      delete updateCityDto.slugEn;
      delete updateCityDto.slugRu;
      delete updateCityDto.nextPayment;
      delete updateCityDto.vkLink;
      delete updateCityDto.telegramLink;
    }
    const oldCity = await this.cityRepository.findOneBy({
      id: updateCityDto.cityId,
    });
    if (!oldCity) {
      throw new HttpException(
        'Ошибка! Город не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const city = new CityEntity();
    Object.assign(city, oldCity, updateCityDto);
    return await this.cityRepository.save(city);
  }

  async getCityBySlug(slug: string): Promise<CityEntity> {
    let city;
    if (/[a-zA-Z]/.test(slug)) {
      city = await this.cityRepository.findOneBy({ slugEn: slug });
    } else {
      city = await this.cityRepository.findOneBy({ slugRu: slug });
    }

    if (!city) {
      throw new NotFoundException();
    }
    return city;
  }

  buildCityResponse(city: CityEntity): CityResponseInterface {
    return {
      city,
    };
  }
}
