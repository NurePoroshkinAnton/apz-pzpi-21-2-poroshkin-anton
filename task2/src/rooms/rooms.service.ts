import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { ClimateProfile } from 'src/climate-profiles/entities/climate-profile.entity';
import { ClimateProfilesService } from 'src/climate-profiles/climate-profiles.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
    private readonly climateProfilesService: ClimateProfilesService,
  ) {}

  async getAll(hotelId: string): Promise<Room[]> {
    return this.roomRepo.find({
      where: {
        hotelId,
      },
    });
  }

  async getById(id: string): Promise<Room> {
    return this.roomRepo.findOneBy({ id });
  }

  async getActiveProfile(roomId: string) {
    const room = await this.getById(roomId);
    let profile: ClimateProfile | null = null;

    for (const client of room.clients) {
      const activeProfile =
        await this.climateProfilesService.getActiveProfileForClient(client.id);

      if (activeProfile) {
        profile = activeProfile;
        break;
      }
    }

    return profile;
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    const device = this.roomRepo.create(dto);
    return this.roomRepo.save(device);
  }

  async update(id: string, dto: UpdateRoomDto): Promise<Room> {
    await this.roomRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string): Promise<void> {
    await this.roomRepo.delete(id);
  }
}
