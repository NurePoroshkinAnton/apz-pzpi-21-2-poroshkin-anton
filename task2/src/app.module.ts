import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { ClimateDevicesModule } from './climate-devices/climate-devices.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { ClimateProfilesModule } from './climate-profiles/climate-profiles.module';
import { CompaniesModule } from './companies/companies.module';

import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PassportModule.register({ session: true }),
    ClimateDevicesModule,
    HotelsModule,
    RoomsModule,
    ClientsModule,
    ClimateProfilesModule,
    CompaniesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
