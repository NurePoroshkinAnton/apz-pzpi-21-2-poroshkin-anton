import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { ClientsService } from 'src/clients/clients.service';
import JwtPayload from 'src/common/types/JwtPayload';
import { CompaniesService } from 'src/companies/companies.service';
import { Role } from './types/Role';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

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
    let client = await this.clientsService.getByEmail(email);

    if (!client) {
      const dto: CreateClientDto = {
        email,
        name: profile.displayName || profile.username,
      };

      client = await this.clientsService.create(dto);
    }

    return {
      sub: client.id,
      email: client.email,
      role: Role.Client,
    };
  }

  async signupCompany(dto: CreateCompanyDto) {
    const password = await bcrypt.hash(dto.password, 10);
    return this.companiesService.create({ ...dto, password });
  }

  async signinCompany(dto: SigninDto) {
    const { email, password } = dto;
    const company = await this.companiesService.getByEmail(email);

    if (!company || !(await bcrypt.compare(password, company.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return company;
  }

  signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get<string>('ACCESS_TOKENT_EXPIRATION_TIME'),
    });
  }
}
