import { randint } from 'src/utils/randint';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import {
  ClimateDevice,
  ClimateDeviceStatus,
  ClimateDeviceType,
} from 'src/climate-devices/entities/climate-device.entity';
import { roomUuids } from './room.seeder';

export default class ClimateDeviceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ClimateDevice);
    await repository.save(climateDevices);
  }
}

export const climateDeviceUuids = [
  'd41c297a-230a-4407-8137-39b1bc585b1a',
  '5a0f535b-8972-4ccb-b469-ece8dae59f88',
  '171aa97e-f4e6-4af5-b096-7bb3a5dd230a',
];

const climateDevices = climateDeviceUuids.map((id, index) => ({
  type:
    index % 2 === 0
      ? ClimateDeviceType.Thermostat
      : ClimateDeviceType.Humidistat,
  id,
  address: `192.107.08.${randint(100, 200)}`,
  accessionNumber: `${randint(0, 10000)}`,
  status: ClimateDeviceStatus.Ok,
  roomId: roomUuids[0],
}));
