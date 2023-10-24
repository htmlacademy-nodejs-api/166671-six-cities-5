import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose';
import { Coords, HousingFeatures, TypeHousing } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
  options: { allowMixed: Severity.ALLOW },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity })
  public authorId!: Ref<UserEntity>;

  @prop({ required: true })
  public city: string;

  @prop({ require: true })
  public coords: Coords;

  @prop({ required: true })
  public datePublication: Date;

  @prop({
    required: true,
    minlength: [20, 'Min length for description is 20'],
    maxlength: [1024, 'Max length for description is 1024'],
  })
  public description: string;

  @prop({ required: true })
  public features: HousingFeatures;

  @prop({ required: true })
  public isFavorites: boolean;

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ require: true })
  public numberComments: number;

  @prop({
    required: true,
    min: [1, 'Min length for numberGuests is 1'],
    max: [10, 'Max length for numberGuests is 10'],
  })
  public numberGuests: number;

  @prop({
    required: true,
    min: [1, 'Min length for numberRooms is 1'],
    max: [8, 'Max length for numberRooms is 8'],
  })
  public numberRooms: number;

  @prop({
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 6,
      message: 'expected length for photosHousing is 6',
    },
  })
  public photosHousing: string[];

  @prop({ required: true })
  public previewImage: string;

  @prop({
    required: true,
    min: [1, 'Min number for rating is 1'],
    max: [5, 'max number for rating is 5'],
  })
  public rating: number;

  @prop({
    required: true,
    min: [100, 'Min number for rentalPrice is 100'],
    max: [100000, 'Max number for rentalPrice is 100 000'],
  })
  public rentalPrice: number;

  @prop({
    required: true,
    minlength: [10, 'Min length for title is 10'],
    maxlength: [100, 'Max length for title is 100'],
  })
  public title: string;

  @prop({ required: true })
  public typeHousing: TypeHousing;

  constructor(data: CreateOfferDto) {
    super();
    this.city = data.city;
    this.coords = data.coords;
    this.datePublication = data.datePublication;
    this.description = data.description;
    this.features = data.features;
    this.isFavorites = data.isFavorites;
    this.isPremium = data.isPremium;
    this.numberGuests = data.numberGuests;
    this.numberRooms = data.numberRooms;
    this.photosHousing = data.photosHousing;
    this.previewImage = data.previewImage;
    this.rating = data.rating;
    this.rentalPrice = data.rentalPrice;
    this.title = data.title;
    this.typeHousing = data.typeHousing;
  }

  public setNumberComments(count: number) {
    this.numberComments = count;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
