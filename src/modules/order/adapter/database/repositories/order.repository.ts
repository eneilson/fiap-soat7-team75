import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderSchema } from '../schemas/order.schema';
import { IOrder } from '@/modules/order/aplication/domain/order';

@Injectable()
export class OrderRepository {
  @InjectModel(OrderSchema.name)
  private readonly orderModel: Model<OrderSchema>;

  create(data: IOrder): Promise<OrderSchema> {
    return this.orderModel.create(data);
  }

  getQueue(): Promise<OrderSchema[]> {
    return this.orderModel.find().sort({ date: -1 }).lean();
  }
}
