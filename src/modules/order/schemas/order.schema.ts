import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  clientId: ObjectId;

  @Prop()
  products: string[];
}

export type OrderDocument = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);
