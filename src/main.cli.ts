import { CLIApplication } from './cli/cli-application.js';
import { HelpCommand, VersionCommand } from './cli/index.js';

const bootstrap = () => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommand([new HelpCommand(), new VersionCommand()]);

  cliApplication.processCommand(process.argv);
};

bootstrap();
