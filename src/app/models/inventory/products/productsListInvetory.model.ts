import { CategoryProductViewModel } from '../../products/categorys/categoryProductView.model';
import { ProductOfInventory } from './productOfInvetory.model';

export interface ProductsListInventoryViewModel {
    category: CategoryProductViewModel;
    products: ProductOfInventory[];
}