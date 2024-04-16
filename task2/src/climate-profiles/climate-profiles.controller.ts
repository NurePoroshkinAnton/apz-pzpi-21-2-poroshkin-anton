import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClimateProfilesService } from './climate-profiles.service';
import { CreateClimateProfileDto } from './dto/create-climate-profile.dto';
import { UpdateClimateProfileDto } from './dto/update-climate-profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('climate-profiles')
@Controller('climate-profiles')
export class ClimateProfilesController {
  constructor(
    private readonly climateProfilesService: ClimateProfilesService,
  ) {}

  @Post()
  create(@Body() createClimateProfileDto: CreateClimateProfileDto) {
    return this.climateProfilesService.create(createClimateProfileDto);
  }

  @Get()
  getAll() {
    return this.climateProfilesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.climateProfilesService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimateProfileDto: UpdateClimateProfileDto,
  ) {
    return this.climateProfilesService.update(id, updateClimateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climateProfilesService.remove(id);
  }
}
