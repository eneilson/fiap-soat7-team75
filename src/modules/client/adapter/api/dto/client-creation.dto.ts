import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

import { Expose } from 'class-transformer';
import { IsCpfOrCnpj } from '@/modules/client/aplication/validator/document.validator';
import { DocumentType } from '@/modules/client/aplication/domain/document';
import { IClient } from '@/modules/client/aplication/domain/client';

export class ClientCreationDTO implements IClient {
  @ApiProperty({
    example: 'Hélio Musque',
  })
  @IsNotEmpty()
  @Expose()
  readonly name: string;

  @ApiProperty({
    example: '161.332.245-33',
  })
  @IsNotEmpty()
  @IsCpfOrCnpj()
  @Expose()
  readonly document: string;

  @ApiProperty({
    example: DocumentType.CPF,
  })
  @IsNotEmpty()
  @Expose()
  readonly documentType: DocumentType;

  @ApiProperty({
    example: {
      zip: '01001-000',
      number: 'Rua Sé',
    },
  })
  @IsNotEmpty()
  @Expose()
  readonly address: {
    zip: string;
    number: string;
  };

  @ApiProperty({
    example: '+5519987654321',
  })
  @IsNotEmpty()
  @Expose()
  readonly phone: string;

  @ApiProperty({
    example: 'chefe@conexaoestrelar.com.br',
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  readonly email: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @Expose()
  readonly allowNotification: boolean;
}
