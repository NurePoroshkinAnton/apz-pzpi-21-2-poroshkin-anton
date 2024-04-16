import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { CompaniesService } from 'src/companies/companies.service';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateCompany(profile: Profile) {
    const existingCompany = await this.companiesService.getByEmail(
      profile.emails[0].value,
    );

    if (existingCompany) {
      return existingCompany;
    }

    const newCompany = this.companiesService.create(profile);
    return newCompany;
  }

  signJwt(company: Company) {
    return this.jwtService.sign(
      { sub: company.id, email: company.email },
      {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.config.get<string>('ACCESS_TOKENT_EXPIRATION_TIME'),
      },
    );
  }
}
