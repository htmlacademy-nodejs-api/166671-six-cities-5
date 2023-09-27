import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { RentalOffer } from '../../../types/rental-offer.interface.js';
import { TypeHousing } from '../../../types/type-housing.type.js';
import {
  adaptBooleanFromString,
  adaptCoordFromString,
  adaptHousingFeaturesFromString,
  adaptPhotosHousingFromString,
} from '../../adapters/fromImportFile.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): RentalOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          authorId,
          city,
          coords,
          datePublication,
          description,
          features,
          isFavorites,
          isPremium,
          numberComments,
          numberGuests,
          numberRooms,
          photosHousing,
          previewImage,
          rating,
          rentalPrice,
          title,
          typeHousing,
        ]) => ({
          authorId,
          city,
          coords: adaptCoordFromString(coords),
          datePublication: new Date(datePublication),
          description,
          features: adaptHousingFeaturesFromString(features),
          isFavorites: adaptBooleanFromString(isFavorites),
          isPremium: adaptBooleanFromString(isPremium),
          numberComments: +numberComments,
          numberGuests: +numberGuests,
          numberRooms: +numberRooms,
          photosHousing: adaptPhotosHousingFromString(photosHousing),
          previewImage,
          rating: +rating,
          rentalPrice: +rentalPrice,
          title,
          typeHousing: typeHousing as TypeHousing,
        })
      );
  }
}
