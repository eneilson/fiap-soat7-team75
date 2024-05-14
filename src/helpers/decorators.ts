import {
  createParamDecorator,
  ExecutionContext,
  PreconditionFailedException,
} from '@nestjs/common';

/**
 * Required query param or throw exception
 */
export const QueryRequired = createParamDecorator((key: string, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest();

  if (req.query[key] === undefined) {
    throw new PreconditionFailedException(`Query param "${key}" is required.`);
  }
  return req.query[key];
});
