import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base-entity.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';

@Entity()
export class Company extends BaseEntity {
  @Column()
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pictureUrl: string;

  @OneToMany(() => Hotel, (hotel) => hotel.company)
  hotels: Hotel[];
}
