import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { IMessage, MessageLevelEnum } from '@/helpers/messages';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  // constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(err: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse();

    let statusCode = 400;
    let messages = [];

    Logger.error(err);

    if (err instanceof ValidationError) {
      Object.values(err.constraints).forEach((m) => {
        messages.push(this.classValidatorMessage(m));
      });

      statusCode = 428;
    }

    const pointer: string = err.constructor.name.replace('Exception', '');
    const detail: string = `${pointer} - ${err.message}`;

    messages = [
      {
        detail,
        level: MessageLevelEnum.ERROR,
      },
    ];

    return reply.status(statusCode).send(statusCode === 404 ? undefined : { data: {}, messages });
  }

  classValidatorParseMessage(msg: string): [string, number] {
    let parsed = msg
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '_')
      .replace('_OR_UNDEFINED', '')
      .replace('_CONFORMING_TO_THE_SPECIFIED_CONSTRAINTS', '');
    let constraint: number; // TODO: verify enum type in messages to
    const found: number = parsed.indexOf('THAN');
    if (found > -1) {
      constraint = Number(parsed.substring(found + 4));
      parsed = parsed.substring(0, found);
    }
    return [parsed, constraint];
  }

  classValidatorMessage(message: string): IMessage {
    const cleanMsg = message.replace('property ', '');
    const field = cleanMsg.substring(0, cleanMsg.indexOf(' '));

    const [key] = this.classValidatorParseMessage(cleanMsg.replace(field, ''));

    return {
      detail: `validation.${key}`,
      level: MessageLevelEnum.ERROR,
    };
  }
}
