import { CityEntity } from '../city/city.entity';
import { ProductEntity } from '../product/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { CategoryEntityInterface } from './types/categoryEntity.interface';

@Entity('category')
export class CategoryEntity implements CategoryEntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Город' })
  title: string;

  @Column({ default: false })
  published: boolean;

  @Column({ default: 'gorod' })
  slugEn: string;

  @Column({ default: 'город' })
  slugRu: string;

  @OneToMany(() => ProductEntity, (product) => product.category, {
    eager: true,
  })
  products: Relation<ProductEntity>[];

  @ManyToOne(() => CityEntity, (city) => city.categories)
  city: Relation<CityEntity>;
}
