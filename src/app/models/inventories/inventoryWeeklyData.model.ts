export interface InventoryWeeklyData {
    createdUser: string;
    closedDate: Date;
    store: string; 
    storeName: string; 
    observation: string;
    weeklyReport?: CategoryWeeklyData[];
}

export interface CategoryWeeklyData {
    category: string;
    items: ItemInventoryWeeklyData[];
}

interface ItemInventoryWeeklyData {
    id: string;
    name: string;
    showName: string;
    unit?: string;
    isNeeded?: boolean;
    quantity?: number;
}