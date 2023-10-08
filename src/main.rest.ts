import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/component.enum.js';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { RestConfig } from './shared/libs/config/rest.config.js';
import { RestSchema } from './shared/libs/config/rest.schema.js';
import { Config } from './shared/libs/config/index.js';

const bootstrap = async () => {
  const container = new Container();
  container
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication);
  container.bind<Logger>(Component.Logger).to(PinoLogger);
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig);

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
};

bootstrap();
