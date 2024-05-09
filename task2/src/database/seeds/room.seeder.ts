import { Room } from 'src/rooms/entities/room.entity';
import { randint } from 'src/utils/randint';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { hotelUuids } from './hotel.seeder';

export default class RoomSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Room);
    await repository.save(rooms);
  }
}

export const roomUuids = [
  'd06f7eca-c677-46d8-a059-01f2e9a7c7f2',
  'ef9a8ae8-64af-4c97-86c4-53ca09d4e60d',
  'b8de313c-3c4d-4b7f-b685-b4ef25417f05',
  '98a98298-bbcd-40a0-93c5-c08fd7321bb8',
  '725041ca-3c5c-42e5-86fa-094113439b72',
  'badf345e-9396-49dc-83e2-311d88437298',
  '784f3aaf-980d-493a-b647-fbf2280c1e71',
  '1ed97504-e709-4135-809c-a9c561776565',
  '71a976a1-4e5d-4aff-b4b1-91e29844333e',
  '5a57b764-891d-4de2-8c73-600af2d6e407',
];

const rooms = roomUuids.map((id) => ({
  id,
  number: randint(100, 500),
  hotelId: hotelUuids[randint(0, hotelUuids.length - 1)],
}));
