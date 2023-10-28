import { RentalOffer } from '../types/rental-offer.interface.js';
import { TypeHousing } from '../types/type-housing.type.js';
import {
  adaptBooleanFromString,
  adaptCoordFromString,
  adaptHousingFeaturesFromString,
  adaptPhotosHousingFromString,
} from '../adapters/fromImportFile.js';
import { UserType } from '../types/index.js';

export const createOffer = (offerData: string): RentalOffer => {
  const [
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
    author,
    avatar,
    email,
    userType,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    avatar,
    email,
    name: author,
    userType: userType as UserType,
  };

  return {
    author: user,
    city,
    coords: adaptCoordFromString(coords),
    datePublication: new Date(datePublication),
    description,
    features: adaptHousingFeaturesFromString(features),
    isFavorites: adaptBooleanFromString(isFavorites),
    isPremium: adaptBooleanFromString(isPremium),
    numberComments: Number.parseInt(numberComments, 10),
    numberGuests: Number.parseInt(numberGuests, 10),
    numberRooms: Number.parseInt(numberRooms, 10),
    photosHousing: adaptPhotosHousingFromString(photosHousing),
    previewImage,
    rating: Number.parseInt(rating, 10),
    rentalPrice: Number.parseInt(rentalPrice, 10),
    title,
    typeHousing: typeHousing as TypeHousing,
  };
};
