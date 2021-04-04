import { CategoryProductViewModel } from './categorys/categoryProductView.model';
import { FlavourProductViewModel } from './flavours/flavourProductView.model';

export interface ProductViewModel {
    id: string;
    name: string;
    flavour?: FlavourProductViewModel;
}
