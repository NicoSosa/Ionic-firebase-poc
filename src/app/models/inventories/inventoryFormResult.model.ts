import { FormStyle } from '../../infrastructure/enum/formStyle.enum';

export interface InventoryFormResult {
    createdDate: number;
    store: string;  
    pages: PageInventoryFormResult[];
}

interface PageInventoryFormResult {
    name: string;
    itsOther?: boolean;
    observation?: string;
    categories: CategoryInventoryFormResult[];
}

interface CategoryInventoryFormResult {
    category: string;
    unit?: string;
    formStyle: FormStyle;
    items: ItemInventoryFormResult[];
}

interface ItemInventoryFormResult {
    id: string;
    name: string;
    showName: string;
    isNeeded: boolean;
}