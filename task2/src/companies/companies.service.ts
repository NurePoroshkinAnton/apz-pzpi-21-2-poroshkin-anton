import { Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  getAll() {
    return this.companyRepo.find();
  }

  getById(id: string) {
    return this.companyRepo.findOneBy({ id });
  }

  getByEmail(email: string) {
    return this.companyRepo.findOneBy({ email });
  }

  create(dto: Profile) {
    const newCompany = this.companyRepo.create({
      email: dto.emails[0].value,
      displayName: dto.displayName,
      pictureUrl: dto.photos[0].value,
    });

    return this.companyRepo.save(newCompany);
  }

  async update(id: string, dto: UpdateCompanyDto) {
    await this.companyRepo.update(id, dto);
    return this.getById(id);
  }

  remove(id: string) {
    return this.companyRepo.delete(id);
  }
}
