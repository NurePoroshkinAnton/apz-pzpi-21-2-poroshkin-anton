import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateHotelDto } from './dto/create-hotel.dto';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  getAll() {
    return this.hotelsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.hotelsService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(id);
  }
}
