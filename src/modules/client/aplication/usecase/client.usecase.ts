import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { ClientRepository } from '../../adapter/database/repositories/client.repository';
import { ClientSchema } from '../../adapter/database/schemas/client.schema';
import { ClientCreationDTO } from '../../adapter/api/dto/client-creation.dto';

@Injectable()
export class ClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async createClient(clientDto: ClientCreationDTO): Promise<ClientSchema> {
    const client = await this.clientRepository.findByDocument(clientDto.document);

    if (client) {
      throw new ConflictException(`User with document ${clientDto.document} already exists`);
    }

    return this.clientRepository.create(clientDto);
  }

  async findClientByDocument(document: string): Promise<ClientSchema> {
    const client = await this.clientRepository.findByDocument(document);

    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }

  async findClientById(id: string): Promise<ClientSchema> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }
}
