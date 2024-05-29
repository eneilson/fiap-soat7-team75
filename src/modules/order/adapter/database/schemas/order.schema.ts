import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractEntity } from '@/types/abstract-entity';
import {
  IOrder,
  IOrderPayment,
  IOrderProduct,
  IOrderClient,
} from '@/modules/order/aplication/domain/order';

@Schema()
export class OrderSchema extends AbstractEntity implements IOrder {
  @Prop({ type: Object })
  client: IOrderClient;

  @Prop({
    default: () => new Date().toISOString(),
  })
  date: string;

  @Prop()
  price: number;

  @Prop({ type: Object })
  products: IOrderProduct[];

  @Prop({ type: Object })
  payment: IOrderPayment;
}
