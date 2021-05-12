export interface InventoryDailyData {
    createdUser: string;
    closedDate: Date;
    createdDate: number;
    store: string;  
    observation: string;
    categories: CategoryDailyData[];
    resumedCategories: CategoryDailyData[];
}

interface CategoryDailyData {
    category: string;
    items: ItemInventoryDailyData[];
}

interface ItemInventoryDailyData {
    id: string;
    name: string;
    showName: string;
    isNeeded: boolean;
    category?: string;
}