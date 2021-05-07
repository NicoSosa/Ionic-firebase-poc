export interface InventoryViewModel {
    createdDate: number;
    id: string;
    store: string;
    user: string;
    products: InventoryListItem[];
    produces: Item[];
    utilities: InventoryListItem[];
}

export interface InventoryListItem {
    category: string;
    items: Item[];
}

interface Item {
    name: string;
    quantity?: number;
    value?: number;
    unit?: string;
}

