import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClimateDevicesService } from './climate-devices.service';
import { CreateClimateDeviceDto } from './dto/create-climate-device.dto';
import { UpdateClimateDeviceDto } from './dto/update-climate-device.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';

@ApiTags('climate-devices')
@ApiBearerAuth()
@Controller('climate-devices')
@UseGuards(AccessTokenGuard)
export class ClimateDevicesController {
  constructor(private readonly climateDeviceService: ClimateDevicesService) {}

  @Post()
  create(@Body() createClimateDeviceDto: CreateClimateDeviceDto) {
    return this.climateDeviceService.create(createClimateDeviceDto);
  }

  @Get()
  getAll() {
    return this.climateDeviceService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.climateDeviceService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClimateDeviceDto: UpdateClimateDeviceDto,
  ) {
    return this.climateDeviceService.update(id, updateClimateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.climateDeviceService.remove(id);
  }
}
