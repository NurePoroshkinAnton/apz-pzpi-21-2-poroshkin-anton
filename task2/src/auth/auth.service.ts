import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'passport-google-oauth20';
import { Company } from 'src/companies/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  getAll() {
    return this.companyRepo.find();
  }

  async validateCompany(profile: Profile) {
    const existingCompany = await this.companyRepo.findOneBy({
      email: profile.emails[0].value,
    });

    if (existingCompany) {
      return existingCompany;
    }

    const newCompany = this.companyRepo.create({
      email: profile.emails[0].value,
      displayName: profile.displayName,
      pictureUrl: profile.photos[0].value,
    });

    return this.companyRepo.save(newCompany);
  }

  findById(id: number) {
    return this.companyRepo.findOneBy({ id });
  }
}
