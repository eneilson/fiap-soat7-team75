import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { ClientUseCase } from '@/modules/client/aplication/usecase/client.usecase';

import { ClientsController } from '@/modules/client/adapter/api/controllers/client.controller';
import { ClientSchema } from '@/modules/client/adapter/database/schemas/client.schema';
import { ClientRepository } from './adapter/database/repositories/client.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientSchema.name, schema: SchemaFactory.createForClass(ClientSchema) },
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientUseCase, ClientRepository],
})
export class ClientModule {}
