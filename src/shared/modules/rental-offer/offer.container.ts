import { Container } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { DefaultOfferService, OfferModel, RentalOfferEntity } from './index.js';
import { types } from '@typegoose/typegoose';

export const createOfferContainer = () => {
  const offerContainer = new Container();

  offerContainer
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService)
    .inSingletonScope();

  offerContainer
    .bind<types.ModelType<RentalOfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  return offerContainer;
};
