import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './services/order.service';
import { OrdersController } from './controllers/orders.controller';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrderModule {}
