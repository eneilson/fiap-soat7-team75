import { Prop, Schema } from '@nestjs/mongoose';
import { IClient } from '@/modules/client/aplication/domain/client';
import { AbstractEntity } from '@/types/abstract-entity';

@Schema()
export class ClientSchema extends AbstractEntity implements IClient {
  @Prop()
  name: string;

  @Prop()
  document: string;

  @Prop()
  documentType: string;

  @Prop({ type: Object })
  address: {
    city?: string;
    number: string;
    state?: string;
    street?: string;
    zip: string;
  };

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  allowNotification: boolean;
}

// export type ClientDocument = HydratedDocument<ClientSchema>;
