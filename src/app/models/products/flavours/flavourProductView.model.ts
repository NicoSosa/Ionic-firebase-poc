import { CategoryProductViewModel } from '../categorys/categoryProductView.model';

export interface FlavourProductViewModel {
    id: string;
    name: string;
    category: CategoryProductViewModel;
}