import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { ProfileEntityInterface } from './types/profileEntity.interface';
import { CityEntity } from '../city/city.entity';
import { UserEntity } from '../next-auth/nextAuth.entity';

@Entity('profile')
export class ProfileEntity implements ProfileEntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

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
  city: Relation<CityEntity>;

  @ManyToOne(() => UserEntity, (user) => user.profiles, {
    nullable: true,
    eager: false,
  })
  userId: Relation<UserEntity>;
}
