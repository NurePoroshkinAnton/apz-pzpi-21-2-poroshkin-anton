import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base-entity.entity';
import { ClimateProfile } from 'src/climate-profiles/entities/climate-profile.entity';

@Entity()
export class Client extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  passportCode: string;

  @OneToMany(() => ClimateProfile, (profile) => profile.client)
  climateProfiles: ClimateProfile[];
}
