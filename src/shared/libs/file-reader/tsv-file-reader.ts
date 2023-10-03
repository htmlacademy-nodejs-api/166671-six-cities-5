import { FileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';

export class TSVFileReader extends EventEmitter implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    //
  }
}
