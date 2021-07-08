export interface InventoryDailyData {
    createdUser: string;
    closedDate: Date;
    store: string; 
    storeName: string; 
    observation: string;
    isNeededCategories?: CategoryDailyData[];
    isProducedCategories?: CategoryDailyData[];
    weeklyReport?: PagesDailyData[];
}

interface CategoryDailyData {
    category: string;
    items: ItemInventoryDailyData[];
}

interface PagesDailyData {
    name: string;
    categories: CategoryDailyData[];
}
interface ItemInventoryDailyData {
    id: string;
    name: string;
    showName: string;
    waste?: number;
    isNeeded?: boolean;
    quantity?: number;
}