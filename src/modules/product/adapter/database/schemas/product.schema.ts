import { Prop, Schema } from '@nestjs/mongoose';

import { IAdditional, IIngredient, IProduct } from '@/modules/product/application/domain/product';
import { AbstractEntity } from '@/types/abstract-entity';

@Schema()
export class ProductSchema extends AbstractEntity implements IProduct {
  @Prop()
  additionals: Array<IAdditional>;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  ingredients: IIngredient[];

  @Prop({ type: 'number' })
  price: number;

  @Prop({
    type: Object,
  })
  category: {
    id: string;
    name: string;
  };
}

// export type ProductDocument = HydratedDocument<Product>;
