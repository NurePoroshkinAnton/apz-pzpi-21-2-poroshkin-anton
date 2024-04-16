import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
  ) {}

  async getAll(): Promise<Room[]> {
    return this.roomRepo.find();
  }

  async getById(id: string): Promise<Room> {
    return this.roomRepo.findOneBy({ id });
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
