export type HousingFeature =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';

/** Список удобств. Один или несколько вариантов из списка. */
export type HousingFeatures = HousingFeature[];
