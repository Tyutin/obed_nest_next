import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntityInterface } from './types/profileEntity.interface';
import { CityEntity } from '..//city/city.entity';

@Entity('profile')
export class ProfileEntity implements ProfileEntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vkId: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  buildingAdress?: string;

  @Column({ nullable: true })
  entranceNumber?: number;

  @Column({ nullable: true })
  apartmentNumber?: number;

  @Column({ nullable: true })
  floorNumber?: number;

  @Column({ default: '' })
  commentForDelivery: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => CityEntity, (city) => city.profiles)
  city: CityEntity;
}
