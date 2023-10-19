import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { RentalOfferEntity } from './rental-offer.entity.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<RentalOfferEntity>>;
  findByUserId(id: string): Promise<DocumentType<RentalOfferEntity> | null>;
  findOrCreate(dto: CreateOfferDto): Promise<DocumentType<RentalOfferEntity>>;
}
