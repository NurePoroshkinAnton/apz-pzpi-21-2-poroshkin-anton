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
  'a4e398db-5d55-42b6-b9a1-05ffc4d3bdca',
  '8922a1ad-010c-495f-9327-c0b138a15248',
  'b92d785a-1bf9-449c-8ddb-8ea8526a9eb0',
  '654db691-7192-4e26-8370-a0da9b8c871f',
  'd7fee384-d130-420d-aaa5-633b21c220a4',
  '176a84c6-c7d0-492f-a793-ef397336c697',
  '3c7462a3-2a94-4391-8edc-2ed416eb8f77',
];

const climateDevices = climateDeviceUuids.map((id, index) => ({
  type:
    index % 2 === 0
      ? ClimateDeviceType.Thermostat
      : ClimateDeviceType.Humidistat,
  id,
  address: `192.107.08.${randint(100, 200)}`,
  status: ClimateDeviceStatus.Ok,
  roomId: roomUuids[index],
}));
