export interface InventoryStructure {
    pages: PageInventory[];
}

export interface PageInventory {
    name: string;
    categories: CategoryInventory[];
}

export interface CategoryInventory {
    category: string;
    items: ItemInventory[];
}

export interface ItemInventory {
    id: string;
    name: string;
    showName: string;
    unit: string;
}