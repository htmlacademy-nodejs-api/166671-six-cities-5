import { CLIApplication } from './cli/cli-application.js';
import { HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

const bootstrap = () => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommand([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApplication.processCommand(process.argv);
};

bootstrap();
