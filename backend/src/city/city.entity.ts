import { CategoryEntity } from '../category/category.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkHoursInterface, defaultWorkHours } from './types/workHours';
import {
  DeliveryZoneInterface,
  defaultDeliveryZones,
} from './types/deliveryZone';
import { getSlugs } from '../../tools/getSlugs';

@Entity('city')
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  nextPayment: Date;

  @Column({ default: true })
  isWorking: boolean;

  @Column()
  city: string;

  @Column()
  slugRu: string;

  @Column()
  slugEn: string;

  @Column({ default: 'Доставка' })
  companyName: string;

  //Контакты
  @Column('text', {
    array: true,
    default: ['+7 (999) 999-99-99', '+7 (3412) 99 99 99'],
  })
  phones: string[];

  @Column({ default: 'email@example.com' })
  email: string;

  @Column({ default: 'https://vk.com' })
  vkLink: string;

  @Column({ default: 'https://t.me' })
  telegramLink: string;

  @Column({ default: '' })
  instagramLink: string;
  //Контакты

  @Column({ default: 'Юридическая информация (контакты, ответственные...)' })
  legalInfo: string;

  @Column({ default: 0 })
  minimumOrderFrom: number;

  @Column({ default: 14 })
  newDayStartTime: number;

  @Column({ type: 'jsonb', nullable: true, default: defaultWorkHours })
  workHours: WorkHoursInterface;

  @Column({ type: 'jsonb', nullable: true, default: defaultDeliveryZones })
  deliveryZones: DeliveryZoneInterface[];

  @Column({ default: 'https://yandex.ru/map-constructor' })
  shippingZoneMapLink: string;

  @OneToMany(() => CategoryEntity, (category) => category.city, { eager: true })
  categories: CategoryEntity[];

  @BeforeInsert()
  setCity() {
    if (!this.city) {
      this.city = 'Городок Н' + Math.ceil(Math.random() * 1000);
    }
    if (!this.slugEn || this.slugRu) {
      const { slugRu, slugEn } = getSlugs(this.city);
      this.slugEn = slugEn;
      this.slugRu = slugRu;
    }
  }

  // Время доставки

  // TODO
  // Промоакции
  // @OneToMany
  // promos
  //
  // мета теги в зависимости от квери параметров
  // @OneToMany
  // meta title
}
