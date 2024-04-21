import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base-entity.entity';
import { ClimateProfile } from 'src/climate-profiles/entities/climate-profile.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Company } from 'src/companies/entities/company.entity';

@Entity()
export class Client extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  passportCode: string;

  @Column({ nullable: true })
  roomId: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Room, (room) => room.clients)
  room: Room;

  @ManyToOne(() => Company, (company) => company.clients)
  company: Company;

  @OneToMany(() => ClimateProfile, (profile) => profile.client)
  climateProfiles: ClimateProfile[];
}
