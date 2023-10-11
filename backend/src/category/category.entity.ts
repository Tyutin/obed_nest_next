import { ProductEntity } from '../product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: true })
  published: boolean;

  @Column()
  slug: string;

  @Column()
  slugRu: string;

  @OneToMany(() => ProductEntity, (product) => product.category, {
    eager: true,
  })
  products: ProductEntity[];
}
