export interface InventoryDailyData {
    createdUser: string;
    closedDate: Date;
    store: string; 
    storeName: string; 
    observation: string;
    isNeededCategories?: CategoryDailyData[];
    isProducedCategories?: CategoryDailyData[];
    weeklyReport?: CategoryDailyData[];
}

interface CategoryDailyData {
    category: string;
    items: ItemInventoryDailyData[];
}
interface ItemInventoryDailyData {
    id: string;
    name: string;
    showName: string;
    unit?:string;
    waste?: number;
    isNeeded?: boolean;
    quantity?: number;
}