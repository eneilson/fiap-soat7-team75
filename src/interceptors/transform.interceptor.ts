import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseData } from '@/types/response.interface';
import { IRequest } from '@/types/request.interface';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<IRequest>();
    // const response = httpContext.getResponse<IResponse>();

    const time = Date.now();

    return next.handle().pipe(
      // timeout(10000),
      map((data): IResponseData<unknown> | StreamableFile | undefined => {
        if (data === undefined) {
          return undefined;
        }

        return {
          data,
          messages: request.messages,
          meta: data.metadata,
          time: Date.now() - time,
        };
      }),
    );
  }
}
