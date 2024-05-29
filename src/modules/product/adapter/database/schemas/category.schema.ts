import { Prop, Schema } from '@nestjs/mongoose';

import { ICategory } from '@/modules/product/application/domain/category';
import { AbstractEntity } from '@/types/abstract-entity';

@Schema()
export class CategorySchema extends AbstractEntity implements ICategory {
  @Prop()
  parentId?: string;

  @Prop()
  name: string;
}

// export type CategoryDocument = HydratedDocument<CategorySchema>;
