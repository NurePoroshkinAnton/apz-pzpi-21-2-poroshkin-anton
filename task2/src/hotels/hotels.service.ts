import { Injectable } from '@nestjs/common';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
  ) {}

  getAll() {
    return this.hotelRepo.find();
  }

  getById(id: string) {
    return this.hotelRepo.findOneBy({ id });
  }

  create(dto: CreateHotelDto) {
    const newCompany = this.hotelRepo.create(dto);
    return this.hotelRepo.save(newCompany);
  }

  async update(id: string, dto: UpdateHotelDto) {
    await this.hotelRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string) {
    const hotel = await this.getById(id);
    await this.hotelRepo.delete(id);
    return hotel;
  }
}
