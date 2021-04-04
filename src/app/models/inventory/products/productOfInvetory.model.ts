import { ProductOfForm } from './productOfForm.model';

export type ProductOfInventory = Omit<ProductOfForm, 'rangeQuantity'>