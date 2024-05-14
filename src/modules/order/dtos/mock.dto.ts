import { ApiProperty } from '@nestjs/swagger';

export class MockDTO {
  @ApiProperty({
    description: 'eai',
    type: String,
  })
  hello: string;

  @ApiProperty({
    description: 'meus consagrado',
    type: String,
  })
  world: string;
}
