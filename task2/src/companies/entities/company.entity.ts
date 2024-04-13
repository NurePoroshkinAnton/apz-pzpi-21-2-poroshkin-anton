import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/base-entity.entity';

@Entity()
export class Company extends BaseEntity {
  @Column()
  displayName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pictureUrl: string;
}
