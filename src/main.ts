import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

import { SwaggerInject } from './helpers/swagger-injector';
import { ExceptionsFilter } from './helpers/exceptions.filter';
import { config } from './helpers/environment';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppModule } from './modules/app.module';

void (async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true, // false,
      maxParamLength: 1000,
    }),
    {
      logger: ['verbose'] /* !config.get('log.level'), */,
    },
  );

  app.enableCors({
    origin: [/\.blackode\.tech$/, /code\.local:8080/, /pdv\.com\.br$/, 'http://localhost:8080'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      errorHttpStatusCode: 422,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());
  // app.setGlobalPrefix('', { exclude: [{ path: 'health', method: RequestMethod.GET }], });

  // swagger
  await SwaggerInject();
  const swaggerDocumentBuilder = new DocumentBuilder()
    .addBearerAuth()
    .addBearerAuth({ type: 'http' }, 'test2')
    .setTitle(`${config.get('application.name')} - API Docs`)
    // .setDescription(config.get('documentation.description'))
    .setVersion(config.get('application.version'))
    .addServer(`http://127.0.0.1:${config.get('application.port')}`, 'Local')
    .addServer(
      `http://${config.get('application.host')}:${config.get('application.port')}`,
      'Homologation',
    )
    // .addServer(config.get('documentation.servers.dev'), 'Development')
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
  };
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );
  SwaggerModule.setup('/docs', app, swaggerDocument);

  const port = config.get('application.port');

  try {
    await app.listen(port, config.get('application.host'));
    Logger.log(`API Listen on ${port}`);
  } catch (error) {
    Logger.error(error);
  }
})();
