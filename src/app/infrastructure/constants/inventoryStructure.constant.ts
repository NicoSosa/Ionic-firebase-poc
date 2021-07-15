import { CategoryInventory, InventoryStructure } from 'src/app/models/inventories/inventoryStructure.model';
import { FormStyle } from '../enum/formStyle.enum';
import { StoresName } from '../enum/stores.enum';

const EMPANADAS: CategoryInventory = {
    category: 'Empanadas',
    id: 0,
    formStyle: FormStyle.IsNeededOnly,
    unit: 'Container',
    items: []
};

const FILLINGS: CategoryInventory = {
    category: 'Fillings',
    id: 1,
    formStyle: FormStyle.InputPlusSlider,
    unit: 'Food Pans',
    items: []
};

const GELATO: CategoryInventory = {
    category: 'Gelato',
    id: 2,
    formStyle: FormStyle.IsNeededOnly,
    unit: 'Trays',  
    items: []
};

const ALFAJORES: CategoryInventory = {
    category: 'Alfajores',
    id: 3,
    formStyle: FormStyle.IsNeededOnly,
    unit: 'Container',  
    items: []
};

const SOUPS: CategoryInventory = {
    category: 'Soups',
    id: 4,
    formStyle: FormStyle.IsNeededOnly,
    unit: 'Case',
    items: []
}

const BEVERAGES: CategoryInventory = {
    category: 'Beverages',
    id: 5,
    formStyle: FormStyle.IsNeededAndHide,
    unit: 'Case',
    items: []
}

const COFFEE_AND_TEAS: CategoryInventory = {
    category: 'Coffee & Teas',
    id: 6,
    formStyle: FormStyle.IsNeededAndHide,
    items: []
}

const MEAT: CategoryInventory = {
    category: 'Meat',
    id: 7,
    formStyle: FormStyle.IsNeededAndHide,
    items: []
}

const DAIRY: CategoryInventory = {
    category: 'Dairy',
    id: 8, 
    formStyle: FormStyle.IsNeededAndHide,
    items: []
}

const FRUITS_AND_VEGETABLES: CategoryInventory = {
    category: 'Fruits & Vegetables',
    id: 9,
    formStyle: FormStyle.IsNeededAndHide,
    items: []
}

const OTHERS: CategoryInventory = {
    category: 'Others for Production',
    id: 10,
    formStyle: FormStyle.IsNeededAndHide,
    items: []
}

const SPICES_DRY_CANNED_AND_BAKING: CategoryInventory = {
    category: 'Spices, Dry, Canned & Baking',
    id: 11,
    formStyle: FormStyle.IsNeededAndHide,
    items: []
}

const UTILITIES_AND_CLEANING: CategoryInventory = {
    category: 'Utilities & Cleaning',
    id: 12,
    formStyle: FormStyle.IsNeededAndHide,
    items: []
};

export const INITIAL_INVENTORY_STRUCT: InventoryStructure  = {
    store: StoresName.HWD,
    pages: [{
        name: 'Empanadas',
        categories: [EMPANADAS,FILLINGS]
    },
    {
        name: 'Dessert & Drinks',
        categories: [GELATO, ALFAJORES, SOUPS]
    },
    {
        name: 'Coffee & Teas',
        categories: [COFFEE_AND_TEAS]
    },
    {
        name: 'Raw materials',
        categories: [MEAT, DAIRY, FRUITS_AND_VEGETABLES, OTHERS]
    },
    {
        name: 'Utilities',
        categories: [SPICES_DRY_CANNED_AND_BAKING, BEVERAGES, UTILITIES_AND_CLEANING],
    }],
};

export const INITIAL_DAILY_INVENTORY_STRUCT: InventoryStructure = {
    store: StoresName.HWD,
    pages: [{
        name: 'Empanadas',
        categories: [EMPANADAS,FILLINGS]
    },
    {
        name: 'Dessert & Drinks',
        categories: [GELATO, ALFAJORES, SOUPS]
    },
    {
    name: 'Others Items',
        itsOther: true,
        categories: [COFFEE_AND_TEAS, MEAT, DAIRY, FRUITS_AND_VEGETABLES, OTHERS, SPICES_DRY_CANNED_AND_BAKING, BEVERAGES, UTILITIES_AND_CLEANING]
    }]
}