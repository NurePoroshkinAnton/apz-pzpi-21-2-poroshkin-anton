import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { SetProfileActiveDto } from './dto/set-profile-active.dto';

@ApiTags('rooms')
@ApiBearerAuth()
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('active-profile')
  getActiveProfile(@Query('roomId') roomId: string) {
    return this.roomsService.getActiveProfile(roomId);
  }

  @Post('set-profile-active')
  @HttpCode(200)
  setActiveProfile(@Body() dto: SetProfileActiveDto) {
    return this.roomsService.setActiveProfile(dto);
  }

  @Get('/number-by-id')
  getNumberById(@Query('roomId') roomId: string) {
    return this.roomsService.getNumberById(roomId);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  getAll(@Param('hotelId') hotelId: string) {
    return this.roomsService.getAll(hotelId);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.roomsService.getById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
