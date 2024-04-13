import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from './common/common.module';
import { TestModule } from './test/test.module';
import { LocationsModule } from './locations/locations.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { ClimateDevicesModule } from './climate-devices/climate-devices.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { ClientsModule } from './clients/clients.module';

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
    CommonModule,
    TestModule,
    LocationsModule,
    FacilitiesModule,
    ClimateDevicesModule,
    HotelsModule,
    RoomsModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
