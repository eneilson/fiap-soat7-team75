import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../schemas/order.schema';

@Injectable()
export class OrdersService {
  @InjectModel(Order.name)
  private ordersModel: Model<Order>;

  create(): Promise<Order> {
    const order = this.ordersModel.create({
      clientId: '1',
      products: [],
    });

    return order;
  }
}
