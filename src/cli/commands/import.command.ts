import chalk from 'chalk';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';
import { createOffer } from '../../shared/helpers/offer.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../shared/modules/rental-offer/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
// import {
//   DefaultUserService,
//   UserModel,
//   UserService,
// } from '../../shared/modules/user/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/index.js';
import { RentalOffer } from '../../shared/types/rental-offer.interface.js';
import { getMongoURI } from '../../shared/helpers/database.js';
import { DEFAULT_DB_PORT } from './command.constant.js';

export class ImportCommand implements Command {
  // private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  // private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    // this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: RentalOffer) {
    await this.offerService.create({
      authorId: offer.authorId,
      city: offer.city,
      coords: offer.coords,
      datePublication: offer.datePublication,
      description: offer.description,
      features: offer.features,
      isFavorites: offer.isFavorites,
      isPremium: offer.isPremium,
      numberComments: offer.numberComments,
      numberGuests: offer.numberGuests,
      numberRooms: offer.numberRooms,
      photosHousing: offer.photosHousing,
      previewImage: offer.previewImage,
      rating: offer.rating,
      rentalPrice: offer.rentalPrice,
      title: offer.title,
      typeHousing: offer.typeHousing,
    });
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    // salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    // this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(getErrorMessage(error));
    }
  }
}
