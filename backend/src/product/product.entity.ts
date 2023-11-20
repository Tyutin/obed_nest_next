import { CategoryEntity } from '../category/category.entity';
import { CityEntity } from '../city/city.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { ProductEntityInterface } from './types/productEntity.interface';

@Entity('product')
export class ProductEntity implements ProductEntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ default: '' })
  image: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  slugEn: string;

  @Column()
  slugRu: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startAvailableTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endAvailableTime: Date;

  @Column({ default: true })
  published: boolean;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: Relation<CategoryEntity>;

  @ManyToOne(() => CityEntity, (city) => city.products)
  city: Relation<CityEntity>;
}
