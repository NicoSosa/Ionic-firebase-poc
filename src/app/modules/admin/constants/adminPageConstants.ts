export const ADMIN_PAGE_TITLE_TOOLBAR = 'Administrator';
export const ADMIN_ITEM_TITLE_TOOLBAR = 'Items Administrator';
export const ADMIN_PRODUCTS_TITLE_TOOLBAR = 'Products Administrator';
export const ADMIN_STRUCT_TITLE_TOOLBAR = 'Inventory Structure Administrator';
export const ADMIN_STORES_TITLE_TOOLBAR = 'Stores Administrator';
export const ADMIN_USERS_TITLE_TOOLBAR = 'Users Administrator';

export const ADMIN_URL = 'admin';

export interface AdminPageCard {
    title: string;
    description: string;
    description2?: string;
    url: string;
    icon: string;
};
export const ADMIN_PAGE_CARDS: AdminPageCard[] = [
    { title: 'Inventory Struct', description: 'Manage the inventory structure', description2:'Create, order, delete or update Pages and Categories', url: 'structure', icon: 'clipboard' },
    { title: 'Inventory Items', description: 'Manage the inventory items',  description2: 'Create, delete, update Items. Change Pages and Category of an Item', url: 'items', icon: 'reader' },
    { title: 'Products', description: 'Create, Delete or update Products', url: 'products', icon: 'pricetag' },
    { title: 'Produce', description: 'Create, Delete or update Produces', url: 'stores', icon: 'reader' },   
    { title: 'Stores', description: 'Create, Delete or update Stores', url: 'stores', icon: 'storefront' },   
    { title: 'Users', description: 'Create, Delete or update Users', url: 'users', icon: 'people' },   
];
