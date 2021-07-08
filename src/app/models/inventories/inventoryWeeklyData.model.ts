export interface InventoryWeeklyData {
    createdUser: string;
    closedDate: Date;
    store: string; 
    storeName: string; 
    observation: string;
    weeklyReport?: CategoryWeeklyData[];
}

export interface PagesWeeklyData {
    name: string;
    categories: CategoryWeeklyData[];
}

export interface CategoryWeeklyData {
    category: string;
    items: ItemInventoryWeeklyData[];
}

interface ItemInventoryWeeklyData {
    id: string;
    name: string;
    showName: string;
    waste?: number;
    isNeeded?: boolean;
    quantity?: number;
}