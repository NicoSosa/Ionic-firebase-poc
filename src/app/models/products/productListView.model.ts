import { CategoryProductViewModel } from './categorys/categoryProductView.model';
import { ProductViewModel } from './productView.model';

export interface ProductListViewModel {
    category: CategoryProductViewModel;
    products: ProductViewModel[];
    listOpen?: boolean;
}