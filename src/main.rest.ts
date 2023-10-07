import { PinoLogger } from './shared/libs/logger/pino.logger.js';
import { RestApplication } from './rest/rest.application.js';
import { RestConfig } from './shared/libs/config/rest.config.js';

const bootstrap = async () => {
  const logger = new PinoLogger();
  const config = new RestConfig(logger);

  const application = new RestApplication(logger, config);
  await application.init();
};

bootstrap();