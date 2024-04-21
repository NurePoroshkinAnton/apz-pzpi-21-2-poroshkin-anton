import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClimateProfilesService } from './climate-profiles.service';
import { CreateClimateProfileDto } from './dto/create-climate-profile.dto';
import { UpdateClimateProfileDto } from './dto/update-climate-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { Request } from 'express';
import JwtPayload from 'src/common/types/JwtPayload';

@ApiTags('climate-profiles')
@ApiBearerAuth()
@Controller('climate-profiles')
@UseGuards(AccessTokenGuard)
export class ClimateProfilesController {
  constructor(
    private readonly climateProfilesService: ClimateProfilesService,
  ) {}

  @Post()
  create(
    @Body() createClimateProfileDto: CreateClimateProfileDto,
    @Req() request: Request,
  ) {
    const payload = request.user as JwtPayload;
    return this.climateProfilesService.create(
      createClimateProfileDto,
      payload.sub,
    );
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
