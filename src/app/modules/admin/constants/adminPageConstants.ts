export const ADMIN_PAGE_TITLE_TOOLBAR = 'Administrator';
export const ADMIN_ITEM_TITLE_TOOLBAR = 'Items Administrator';
export const ADMIN_MASIVE_TITLE_TOOLBAR = 'Masive Changes Administrator';
export const ADMIN_STRUCT_TITLE_TOOLBAR = 'Inventory Structure Administrator';
export const ADMIN_USERS_TITLE_TOOLBAR = 'Users Administrator';

export const ADMIN_URL = 'admin';

export const INV_STRUCT_SAVE = 'The Inventory Structure has been saved';

export interface AdminPageCard {
    title: string;
    description: string;
    description2?: string;
    url?: string;
    icon: string;
    urlButtons?: UrlButton[]
};

interface UrlButton {
    url: string;
    description: string;
};

export const ADMIN_PAGE_CARDS: AdminPageCard[] = [
    { title: 'Inventory Struct', description: 'Manage the inventory structure', description2:'Create, order, delete or update Pages and Categories', urlButtons: [{url: 'structure/weekly', description: 'Weekly'}, {url: 'structure/daily', description: 'Daily'}], icon: 'clipboard' },
    // { title: 'Inventory Items', description: 'Manage the inventory items',  description2: 'Create, delete, update Items. Change Pages and Category of an Item', url: 'items', icon: 'reader' },
    { title: 'Inventory Items', description: 'Manage the inventory items',  description2: 'Create, delete, update Items. Change Pages and Category of an Item', url: 'items', icon: 'pricetag' },
    { title: 'Masive Changes', description: 'Create, Delete or move items massively', url: 'masive-changes', icon: 'pricetags' }, 
    // { title: 'Stores', description: 'Create, Delete or update Stores', url: 'stores', icon: 'storefront' },   
    { title: 'Users', description: 'Create, Delete or update Users', url: 'users', icon: 'people' },   
];
