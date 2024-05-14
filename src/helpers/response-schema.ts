import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function ResponseSchema(name: string): SchemaObject {
  return {
    type: 'object',
    description: name ? `ResponseWrapper/${name}` : undefined,
    properties: {
      data: {
        $ref: name ? `#/components/schemas/${name}` : undefined,
      }, // properties ?? { type: 'object', nullable: true, },
      messages: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/MessageDTO',
        },
      },
      time: {
        type: 'number',
      },
    },
  };
}
