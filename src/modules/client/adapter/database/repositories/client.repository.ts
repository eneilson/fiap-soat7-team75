import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientSchema } from '@/modules/client/adapter/database/schemas/client.schema';
import { ClientCreationDTO } from '../../api/dto/client-creation.dto';

@Injectable()
export class ClientRepository {
  @InjectModel(ClientSchema.name)
  private readonly clientModel: Model<ClientSchema>;

  async create(clientDto: ClientCreationDTO): Promise<ClientSchema> {
    const saveclient = await this.clientModel.create(clientDto);
    return saveclient;
  }

  findByDocument(document: string): Promise<ClientSchema> {
    return this.clientModel.findOne({ document }).lean();
  }

  findById(id: string): Promise<ClientSchema> {
    return this.clientModel.findOne({ _id: id }).lean();
  }
}
