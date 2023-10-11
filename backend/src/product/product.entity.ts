import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
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
  slug: string;

  @Column()
  slugRu: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startAvailableTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  endAvailableTime: Date;

  @Column({ default: true })
  published: boolean;
}
