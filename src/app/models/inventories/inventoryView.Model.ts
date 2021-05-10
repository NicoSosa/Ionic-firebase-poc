import { FormStyle } from '@angular/common';

export interface InventoryViewModel {
    createdDate: number;
    closedDate: Date;
    pages: PageInventoryViewModel[];
    store: string;
    createdUser: string;
}

interface PageInventoryViewModel {
    name: string;
    categories: CategoryInventoryViewModel[];
    itsOther?: boolean;
    observation?: string;
}
interface CategoryInventoryViewModel {
    category: string;
    unit?: string;
    formStyle: FormStyle;
    items: ItemViewModel[];
}

interface ItemViewModel {
    id: string;
    name: string;
    showName: string;
    quantity?: number;
    unit?: string;
    slid?: number;
}

