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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { Request } from 'express';
import JwtPayload from 'src/common/types/JwtPayload';

@ApiTags('clients')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(AccessTokenGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto, @Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.clientsService.create(createClientDto, payload.sub);
  }

  @Get()
  getAll(@Req() request: Request) {
    const payload = request.user as JwtPayload;
    return this.clientsService.getAll(payload.sub);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.clientsService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
