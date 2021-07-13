import { FormStyle } from '../../infrastructure/enum/formStyle.enum';
import { StoresName } from '../../infrastructure/enum/stores.enum';

export interface InventoryStructure {
    pages: PageInventory[];
    store: StoresName;
}

export interface PageInventory {
    name: string;
    itsOther?: boolean;
    categories: CategoryInventory[];
}

export interface CategoryInventory {
    category: string;
    id: number;
    unit?: string;
    formStyle: FormStyle;
    items: ItemInventory[];
}

export interface ItemInventory {
    id: string;
    name: string;
    showName: string;
    categoryId: number;
    unit?: string;
    waste?: number;
    slid?: number;
    steps?: number;
    isSwitch?: boolean; // FormStyle
}
export interface DBInventoryStructure extends InventoryStructure{
    dateUpdated: number;
    userUpdated: string;
}