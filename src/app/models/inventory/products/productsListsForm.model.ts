import { CategoryProductViewModel } from '../../products/categorys/categoryProductView.model';
import { ProductOfForm } from './productOfForm.model';

export interface ProductsListFormViewModel {
    category: CategoryProductViewModel;
    products: ProductOfForm[];
}