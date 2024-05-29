import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { OrderSchema } from './adapter/database/schemas/order.schema';
import { OrderController } from './adapter/api/controllers/order.controller';
import { OrderUseCase } from './aplication/usecase/order.usecase';
import { OrderRepository } from './adapter/database/repositories/order.repository';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: OrderSchema.name, schema: SchemaFactory.createForClass(OrderSchema) },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderUseCase, OrderRepository],
})
export class OrderModule {}
