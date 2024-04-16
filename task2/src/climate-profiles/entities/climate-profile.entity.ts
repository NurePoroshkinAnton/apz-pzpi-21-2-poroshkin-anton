import { BaseEntity } from 'src/common/base-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';

export enum ClimateDeviceType {
  Thermostat = 'thermostat',
  Humidistat = 'humidistat',
}

export enum ClimateDeviceStatus {
  Ok = 'ok',
  Warning = 'warning',
  Error = 'error',
}

@Entity()
export class ClimateProfile extends BaseEntity {
  @Column()
  name: string;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => Client, (client) => client.climateProfiles)
  client: Client;
}
