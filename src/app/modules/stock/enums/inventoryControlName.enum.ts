export enum InventoryControlName {
    Store = 0,
    ProductsInv = 1,
    ProducesInv = 2,
    UtilitiesInv = 3,
}

export const InventoryControlNameDescript = new Map<number, string> ([
    [InventoryControlName.Store ,'store'], // 0
    [InventoryControlName.ProductsInv ,'productsInv'], // 1
    [InventoryControlName.ProducesInv ,'producesInv'], // 2
    [InventoryControlName.UtilitiesInv ,'utilitiesInv'], // 3
]);
