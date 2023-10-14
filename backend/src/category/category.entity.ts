import { CityEntity } from '../city/city.entity';
import { ProductEntity } from '../product/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Город' })
  title: string;

  @Column({ default: true })
  published: boolean;

  @Column({ default: 'gorod' })
  slug: string;

  @Column({ default: 'город' })
  slugRu: string;

  @OneToMany(() => ProductEntity, (product) => product.category, {
    eager: true,
  })
  products: ProductEntity[];

  @ManyToOne(() => CityEntity, (city) => city.categories)
  city: CityEntity;
}
