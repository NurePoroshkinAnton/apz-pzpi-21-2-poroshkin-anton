import { Module } from '@nestjs/common';
import { ClimateProfilesService } from './climate-profiles.service';
import { ClimateProfilesController } from './climate-profiles.controller';
import { ClimateProfile } from './entities/climate-profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClimateProfile])],
  controllers: [ClimateProfilesController],
  providers: [ClimateProfilesService],
})
export class ClimateProfilesModule {}
