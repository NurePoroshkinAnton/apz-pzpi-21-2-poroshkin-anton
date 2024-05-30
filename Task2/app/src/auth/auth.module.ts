import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/GoogleStrategy';
import { GoogleAuthGuard } from './guards/GoogleAuthGuard';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from './utils/SessionSerializer';
import { CompaniesModule } from 'src/companies/companies.module';
import { Company } from 'src/companies/entities/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    CompaniesModule,
    JwtModule,
    ClientsModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, GoogleAuthGuard, AuthService, SessionSerializer],
})
export class AuthModule {}
