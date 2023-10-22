import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './rental-offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findByUserId(id: string): Promise<DocumentType<OfferEntity> | null>;
  findOrCreate(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
}
