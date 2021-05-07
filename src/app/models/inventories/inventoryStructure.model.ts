import { FormStyle } from '../../infrastructure/enum/formStyle.enum';
export interface InventoryStructure {
    pages: PageInventory[];
}

export interface PageInventory {
    name: string;
    itsOther?: boolean;
    categories: CategoryInventory[];
}

export interface CategoryInventory {
    category: string;
    unit?: string;
    formStyle: FormStyle;
    items: ItemInventory[];
}

export interface ItemInventory {
    id: string;
    name: string;
    showName: string;
    unit?: string;
    slid?: number;
}

export interface DBInventoryStructure extends InventoryStructure{
    dateUpdated: number;
    userUpdated: string;
}