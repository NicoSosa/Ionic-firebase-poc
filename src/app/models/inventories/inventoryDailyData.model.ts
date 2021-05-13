export interface InventoryDailyData {
    createdUser: string;
    closedDate: Date;
    store: string; 
    storeName: string; 
    observation: string;
    isNeededcategories: CategoryDailyData[];
    isProducedCategories: CategoryDailyData[];
}

interface CategoryDailyData {
    category: string;
    items: ItemInventoryDailyData[];
}

interface ItemInventoryDailyData {
    id: string;
    name: string;
    showName: string;
    isNeeded?: boolean;
    quantity?: number;
}