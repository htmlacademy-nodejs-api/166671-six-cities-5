import { Coords, HousingFeatures } from '../types/index.js';

export const adaptCoordFromString = (coords: string): Coords => {
  const [latitude, longitude] = coords.split(',');
  return { latitude: +latitude, longitude: +longitude };
};

export const adaptHousingFeaturesFromString = (
  features: string
): HousingFeatures => (features.split(',') as HousingFeatures) ?? [];

export const adaptBooleanFromString = (value: string): boolean =>
  value.startsWith('true');

export const adaptPhotosHousingFromString = (value: string) => value.split(',');
