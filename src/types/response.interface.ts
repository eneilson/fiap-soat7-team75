import { FastifyReply } from 'fastify';
import { IMessage } from '@/helpers/messages';

export type Metadata<T = unknown> = T;

export interface IResponseData<T> {
  data: T;
  meta?: Metadata;
  messages: IMessage[];
  time: number;
}

export type IResponse = FastifyReply;
