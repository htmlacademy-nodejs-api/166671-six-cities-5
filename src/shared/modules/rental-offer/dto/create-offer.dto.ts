import { Coords, HousingFeatures, TypeHousing } from '../../../types/index.js';

export class CreateOfferDto {
  authorId: string;
  city: string;
  coords: Coords;
  datePublication: Date;
  description: string;
  features: HousingFeatures;
  isFavorites: boolean;
  isPremium: boolean;
  numberComments: number;
  numberGuests: number;
  numberRooms: number;
  photosHousing: string[];
  previewImage: string;
  rating: number;
  rentalPrice: number;
  title: string;
  typeHousing: TypeHousing;
}
