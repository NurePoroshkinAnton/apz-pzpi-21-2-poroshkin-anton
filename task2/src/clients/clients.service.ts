import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  async getAll(): Promise<Client[]> {
    return this.clientRepo.find();
  }

  async getById(id: string): Promise<Client> {
    return this.clientRepo.findOneBy({ id });
  }

  async create(dto: CreateClientDto): Promise<Client> {
    const client = this.clientRepo.create(dto);
    return this.clientRepo.save(client);
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    await this.clientRepo.update(id, dto);
    return this.getById(id);
  }

  async remove(id: string): Promise<void> {
    await this.clientRepo.delete(id);
  }
}
