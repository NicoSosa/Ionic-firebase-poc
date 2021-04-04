import { FlavourProductViewModel } from './flavours/flavourProductView.model';

export interface ProductModel {
    id: string;
    name: string;
    flavour?: FlavourProductViewModel;

    createdUser: string;
    createdDate: Date;
    updatedUser: string;
    updatedDate: Date;
}