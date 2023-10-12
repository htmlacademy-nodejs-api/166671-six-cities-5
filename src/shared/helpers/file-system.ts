import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getCurrentModuleDirectoryPath = () => {
  const filepath = fileURLToPath(import.meta.url);

  return dirname(filepath);
};
