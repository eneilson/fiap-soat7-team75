import { ClassConstructor, plainToInstance } from 'class-transformer';

export function mapToInstance<T>(plain: unknown[], cls: ClassConstructor<T>): T[];
export function mapToInstance<T>(plain: unknown, cls: ClassConstructor<T>): T;
export function mapToInstance<T>(plain: unknown, cls: ClassConstructor<T>): T | T[] {
  return plainToInstance(cls, plain, {
    excludeExtraneousValues: true,
  });
}
