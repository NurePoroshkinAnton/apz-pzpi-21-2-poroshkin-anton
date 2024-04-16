import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { ClientsService } from 'src/clients/clients.service';
import JwtPayload from 'src/common/types/JwtPayload';
import { CompaniesService } from 'src/companies/companies.service';
import { Role } from './types/Role';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(profile: Profile) {
    const email = profile.emails[0].value;
    const existingClient = await this.clientsService.getByEmail(email);

    if (existingClient) {
      return this.validateClient(profile);
    }

    return this.validateCompany(profile);
  }

  private async validateClient(profile: Profile) {
    const email = profile.emails[0].value;
    const client = await this.clientsService.getByEmail(email);

    return {
      sub: client.id,
      email: client.email,
      role: Role.Client,
    };
  }

  private async validateCompany(profile: Profile) {
    const email = profile.emails[0].value;
    let comapny = await this.companiesService.getByEmail(email);

    if (!comapny) {
      comapny = await this.companiesService.create(profile);
    }

    return {
      sub: comapny.id,
      email: comapny.email,
      role: Role.Company,
    };
  }

  signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get<string>('ACCESS_TOKENT_EXPIRATION_TIME'),
    });
  }
}
