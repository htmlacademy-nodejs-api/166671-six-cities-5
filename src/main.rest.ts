import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Config } from './shared/libs/config/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from './shared/libs/database-client/index.js';

const bootstrap = async () => {
  const container = new Container();
  container
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  container
    .bind<DatabaseClient>(Component.DataBaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
};

bootstrap();
