import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse, IResponseData } from '@/types/response.interface';
import { IRequest } from '@/types/request.interface';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<IRequest>();
    const response = httpContext.getResponse<IResponse>();

    const time = Date.now();

    return next.handle().pipe(
      // timeout(10000),
      map((data): IResponseData<unknown> | StreamableFile | undefined => {
        if (data === undefined) {
          response.status(204);
          return undefined;
        }

        return {
          data,
          messages: request.messages,
          time: Date.now() - time,
        };
      }),
    );
  }
}
