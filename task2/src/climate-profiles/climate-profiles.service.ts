import { Injectable } from '@nestjs/common';
import { CreateClimateProfileDto } from './dto/create-climate-profile.dto';
import { UpdateClimateProfileDto } from './dto/update-climate-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClimateProfile } from './entities/climate-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClimateProfilesService {
  constructor(
    @InjectRepository(ClimateProfile)
    private climateProfileRepo: Repository<ClimateProfile>,
  ) {}

  async getAll(): Promise<ClimateProfile[]> {
    return this.climateProfileRepo.find();
  }

  async getById(id: string): Promise<ClimateProfile> {
    return this.climateProfileRepo.findOneBy({ id });
  }

  async create(dto: CreateClimateProfileDto): Promise<ClimateProfile> {
    const ClimateProfile = this.climateProfileRepo.create(dto);
    return this.climateProfileRepo.save(ClimateProfile);
  }

  async update(
    id: string,
    dto: UpdateClimateProfileDto,
  ): Promise<ClimateProfile> {
    await this.climateProfileRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string): Promise<void> {
    await this.climateProfileRepo.delete(id);
  }
}
