import { inject, injectable } from 'inversify';
import { OfferService } from './index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './index.js';
import { generateRandomValue } from '../../helpers/index.js';
import { CreateOfferDto } from './index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(
    dto: CreateOfferDto
  ): Promise<DocumentType<OfferEntity>> {
    const offer = new OfferEntity(dto);
    offer.setNumberComments(generateRandomValue(1, 5, 1));

    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${offer.title}`);

    return result;
  }

  public async findByUserId(
    id: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id);
  }

  public async findOrCreate(
    dto: CreateOfferDto
  ): Promise<DocumentType<OfferEntity>> {
    const exitedOffer = await this.findByUserId(dto.authorId);

    if (exitedOffer) {
      return exitedOffer;
    }

    return this.create(dto);
  }
}
