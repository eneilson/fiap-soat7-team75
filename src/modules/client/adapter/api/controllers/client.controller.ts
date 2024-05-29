import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ClientUseCase } from '@/modules/client/aplication/usecase/client.usecase';
import { ClientDTO } from '../dto/client.dto';
import { EmptyDTO } from '@/types/response.interface';
import { toDTO } from '@/helpers/dto-mapper';
import { ClientCreationDTO } from '../dto/client-creation.dto';
import { OrderDTO } from '@/modules/order/adapter/api/dto/order.dto';

@ApiTags('Clients')
@Controller('client')
export class ClientsController {
  constructor(private readonly clientUseCase: ClientUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Find client by document' })
  @ApiQuery({ name: 'document', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'Return the client with the specified document',
    type: ClientDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: client with the specified document not found.',
  })
  async findByDocument(@Query('document') document: string): Promise<ClientDTO> {
    const client = await this.clientUseCase.findClientByDocument(document);

    return plainToClass(ClientDTO, client, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find client by id' })
  @ApiParam({
    name: 'id',
    required: true,
    example: '1e60b435-e02a-4d93-a860-f70e36766c57',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the client with the specified id',
    type: ClientDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: client with the specified id not found.',
  })
  async findById(@Param('id') id: string): Promise<OrderDTO> {
    const client = await this.clientUseCase.findClientById(id);

    return toDTO(client, ClientDTO);
  }

  @Post()
  @ApiOperation({ summary: 'Create client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
    type: ClientDTO,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: User with the same document already exists.',
    type: EmptyDTO,
  })
  async createCrient(@Body() clientDto: ClientCreationDTO): Promise<ClientDTO> {
    return toDTO(await this.clientUseCase.createClient(clientDto), ClientDTO);
  }
}
