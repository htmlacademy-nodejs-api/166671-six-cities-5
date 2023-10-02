import dayjs from 'dayjs';
import { MockServerData } from '../../../types/mock-server-data.type.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/common.js';
import { OfferGenerator } from './offer-generator.interface.js';

const MIN_PRICE = 100;
const MAX_PRICE = 10000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const authorId = getRandomItem<string>(this.mockData.authorsId);
    const city = getRandomItem<string>(this.mockData.cities);
    const coords = getRandomItem<string>(this.mockData.coords);

    const datePublication = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const description = getRandomItem<string>(this.mockData.descriptions);
    const features = getRandomItems(this.mockData.features).join(',');
    const isFavorites = getRandomItem<boolean>(
      this.mockData.isFavorites
    ).toString();
    const isPremium = getRandomItem<boolean>(
      this.mockData.isPremium
    ).toString();
    const numberComments = getRandomItem<number>(
      this.mockData.numberComments
    ).toString();
    const numberGuests = getRandomItem<number>(
      this.mockData.numberGuests
    ).toString();
    const numberRooms = getRandomItem<number>(
      this.mockData.numberRooms
    ).toString();
    const photosHousing = getRandomItems<string>(
      this.mockData.photosHousing
    ).join(',');
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const rating = getRandomItem<number>(this.mockData.ratings).toString();
    const rentalPrice = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const title = getRandomItem(this.mockData.titles);
    const typeHousing = getRandomItem(this.mockData.typeHousing);

    return [
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
    ].join('\t');
  }
}
